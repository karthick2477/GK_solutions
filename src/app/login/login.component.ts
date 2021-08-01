import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadDataApiService } from '../load-data-api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from './guards/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup=this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
});;
  loading = false;
  error="";
  submitted = false;
  returnUrl="";

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http:LoadDataApiService,
      private spinnerService: Ng4LoadingSpinnerService,
      private authService : AuthService 
      ) { }

  ngOnInit() {
    this.returnUrl="/AdminDesignPageComponent";
    this.authService.logout();
    

    
     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

 
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      let body={
        username:this.form.controls.username.value,
        password:this.form.controls.password.value
      }
      try{
        this.spinnerService.show();
      this.http.login(body).subscribe(data =>
        {
         
          this.spinnerService.hide();
        
          if(data["resphtml"] =="Not a Valid User")
          {
            window.alert("Check your credentials")
            this.loading=false;
          }
          else
          localStorage.setItem('isLoggedIn', "true");  
          localStorage.setItem('token', this.form.controls.username.value);
          this.router.navigateByUrl("/AdminDesignPageComponent");
        })
       
      }
      catch(e)
      {
        this.loading=false;
      }
     // if(this.form.controls.username.value == "karthi" && this.form.controls.password.value =="1234")
      // else
      //   this.error="Invalid Credentials";
      //   window.alert("Invalid data")
      // }
    
    }


}
