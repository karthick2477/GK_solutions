import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

 
  form: FormGroup=this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    Address:['',Validators.required],
    Requirement:['',Validators.required],
    number:['',Validators.required]
});;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      ) { }


  ngOnInit() {
  }
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
    
    }

}
