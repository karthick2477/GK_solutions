import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { LoadDataApiService } from '../load-data-api.service';
import { ModalService } from '../_modal';
import { environment } from 'src/environments/environment';
import { merge } from 'rxjs';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  showmodal:boolean;
  form: FormGroup=this.formBuilder.group({
    productname: ['', Validators.required],
    Description: ['', Validators.required],
    Image:['',Validators.required],
    productInitial:['',Validators.required],
    DoorName:['',Validators.required],
    filterProduct: ['']
});productedsObservable: any;
;
  loading = false;
  showDrop:boolean=true;
  config=[];
  noData:boolean;
  DesignData:any;
  DescribeData:any;
  showdrop:boolean;
  imgdata=[];
  DesignData1:any=[];
  Designdatas:any;
  validDoorType:boolean=true;
  validDoorInitial:boolean=true;
  urls = new Array<string>();
  submitted = false;
  prodID=[];
  prodId1:any=[];
  constructor(private route:ActivatedRoute,private http:HttpClient, private formBuilder: FormBuilder,private designser:LoadDataApiService,private spinnerService: Ng4LoadingSpinnerService,private modalService: ModalService,private router:Router) { }

  ngOnInit() {
   this.onLoadData();
  }
  onLoadData()
  {
    this.spinnerService.show();
    this.designser.getDesigns()
    .subscribe((data) =>
    {

      this.spinnerService.hide();
      
      if(data["response"].length > 0)
      {
        let product=[]
     this.config.push(data["response"]);
    
    this.Designdatas=this.config[0];
  
     this.Designdatas.forEach(pro => {
       this.prodID.push(pro.id);
       let found = false;
       for(let i=0;i<product.length;i++)
       {
         
         if(product[i].name===  pro["name"].trim())
         {
          
           found = true;
           break;
         }
       }
       if(!found)
       {
         product.push(pro);
       }
      
  });
    
  this.DesignData1=product;
      }
      else
      {
        this.noData=true;
      }
    //this.showdrop=false;
    });
    
    this.form.get('filterProduct').valueChanges.subscribe(
      value => {
       this.Designdatas=this.config[0];

        if(value.trim() !=="All Doors")
        {
         this.Designdatas= this.Designdatas.filter((pro)=>
        {
                 return  pro.name == value.split('-')[0].trim();

        })
        }
       
      
        //this.Designdatas=this.tempdata;
     
     // this.showdrop=true;
    }
    )
  
  }
  routeToLogin()
  {
    
    this.router.navigateByUrl("/Admin/Login")
  }
  openModal(id: string) {
    this.showmodal=true;
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
    
    }
    changeFile(file) {
    //  console.log(file)
      return  new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.toString().split('data:image/jpeg;base64,')[1]);
          reader.onerror = error => reject(error);
      });
  }
  
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = btoa(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
  }
  async  detectFiles(event) {

        if (event.target.value) {
            const files = event.target.files;
           for(let i=0;i<files.length;i++)
         await   this.changeFile(files[i]).then((base64: string): any => {
                console.log(base64)
                this.imgdata.push(base64);
               // this.imgdata.push(this.b64toBlob([base64], Blob,""));
              //  console.log(this.imgdata)
              
            });
        } 
        
    }
    changeWebsite(e:any)
    {

      let pname=e.split('-')[1];
      let currentprodID=[];
     this.prodId1=[];

      this.prodID.filter((ele)=>
      {
      
        if(ele.split('-')[0].trim() === pname.trim())
        {  
        
         this.prodId1.push(ele);
       
        }
      
      });
     
      this.prodId1.filter((num)=>
        {
    
          currentprodID.push(num.split('-')[1]);
        });
        let max=0;
        currentprodID.forEach(num =>
          { 
            if(parseInt(num) > max)
            max=num;
           
        });
          max++;
          if(max <= 9)
          {
           this.form.get("productname").setValue(e.split('-')[1] +"-"+ "0"+ max);
          }
          else{
             this.form.get("productname").setValue(e.split('-')[1] +"-"+ max);
          }
      }
     uploadData()
      {
      //   if (this.form.invalid) {
      //     return;
      // }
console.log(this.imgdata.length)
      this.loading = true;
        this.spinnerService.show();
        let body={};
        if(this.imgdata.length == 1)
        {
       
        if(!this.showDrop)
        {
          body={
            id:this.form.controls.productname.value,
            imageBlob:this.imgdata[0],
            description:this.form.controls.Description.value,
            name:this.form.controls.DoorName.value
         }

        }
        else
         body={
           id:this.form.controls.productname.value,
           imageBlob:this.imgdata[0],
           description:this.form.controls.Description.value,
           name:this.form.controls.filterProduct.value.split("-")[0]
        }
     this.designser.uploadData(body).subscribe((data) => {

            this.spinnerService.hide();
            location.reload();

          }); 
      }
   else
   {
     
     let newId =this.form.controls.productname.value;
    // let bodyArr = [];
     for(let i=0;i<this.imgdata.length;i++)
     {
       console.log(newId)

      if(!this.showDrop)
      {
        body={
          id:newId,
          imageBlob:this.imgdata[i],
          description:this.form.controls.Description.value,
          name:this.form.controls.DoorName.value
       }
      // bodyArr.push(body);

      }
      else
      {
       body={
         id:newId,
         imageBlob:this.imgdata[i],
         description:this.form.controls.Description.value,
         name:this.form.controls.filterProduct.value.split("-")[0]
      }
    }
    this.multipleApicall(body);
     // bodyArr.push(body);
       let num = parseInt(body["id"].split('-')[1]);
       num++;
       
       if(num <= 9)
       {
        newId = this.form.controls.productname.value.split('-')[0]+'-0'+num;
       }
       else{
        newId = this.form.controls.productname.value.split('-')[0]+'-'+num;
       }


     }
     alert("added successfully")
     //location.reload();
 // this.addAllproducts(bodyArr)
    this.reloadPage();   }

      }
  async multipleApicall(body)
   {
         
  await this.designser.uploadData(body).subscribe((data) => {

    //this.spinnerService.hide();
    console.log(data);
    

  }); 


   }
      addNewDoor()
      {
        this.showDrop=false;
        this.form.get("productname").setValue("");
      }
      backtodrop()
      {
        this.showDrop=true;
        this.form.get("productname").setValue("");
      }
      reloadPage()
      {
      location.reload();
      }

      checkDoortypes(e)
      {
        this.validDoorType=true;
        for(let i=0;i<this.Designdatas.length;i++)
        {
          if(this.Designdatas[i].name.trim().toLowerCase() === e.target.value.trim().toLowerCase())
          {
this.validDoorType=false;
this.form.get("productname").setValue("");

          }
        }
        
         
      }

      checkDoorInitial(e)
      {
        this.validDoorInitial=true;
      
        for(let i=0;i<this.Designdatas.length;i++)
        {
        
          if(this.Designdatas[i].id.split("-")[0].trim().toLowerCase() === e.target.value.trim().toLowerCase())
          {
this.validDoorInitial=false;
this.form.get("productname").setValue("");

          }
         
        }
        if(e.target.value && this.validDoorInitial)
        {
        this.form.get("productname").setValue(e.target.value.toUpperCase()+"-"+ "01" );
        }
        else{
          this.form.get("productname").setValue("");
        }

       
         
      }
}
// function observableFrom(bodyArr: any[]) {
//   throw new Error('Function not implemented.');
// }

// function concatMap(arg0: (entry: any) => any): any {
//   throw new Error('Function not implemented.');
// }

