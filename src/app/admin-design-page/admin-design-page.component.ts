import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadDataApiService } from '../load-data-api.service';
import { AuthService } from '../login/guards/auth.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-admin-design-page',
  templateUrl: './admin-design-page.component.html',
  styleUrls: ['./admin-design-page.component.css']
})
export class AdminDesignPageComponent implements OnInit {

  config=[];
  showmodal:boolean;
  DesignData:any;
  tempdata=[];
  Designdatas:any;
  DescribeData:any;
  showdrop:boolean;
  DesignData1:any=[];
  enableDesc:boolean=true;
  enablebutton:boolean=true;
  noData:boolean;
  myForm: FormGroup= this.fb.group({
   filterProduct: [''],
   textarea1:""
   
 })
//  myForm1:FormGroup=this.fb.group({
//   textarea1:""
//  })
   filteredProducts = [];
   constructor(private modalService: ModalService,private authService: AuthService,private fb:FormBuilder,private designser:LoadDataApiService,private spinnerService: Ng4LoadingSpinnerService
     ) {
   
    }
 
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
    
    this.myForm.get('filterProduct').valueChanges.subscribe(
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
     
   // }
   }
   openModal(id: string,a:any) {
     this.showmodal=true;
       this.modalService.open(id);
       this.myForm.controls.textarea1.disable();
       this.myForm.controls.textarea1.setValue(a.description)
       this.enablebutton=true;
       this.DescribeData=a; 
   }
 
   closeModal(id: string) {
       this.modalService.close(id);
   }
   enableUpload()
   {
    //
    
    this.enableDesc=false;
     this.enablebutton=false;
     if(this.enableDesc=true)
     this.myForm.controls.textarea1.enable();
     else
     this.myForm.controls.textarea1.disable();
   
   }
   updatedata()
   {
     console.log(this.myForm.controls.textarea1.value);

        
    location.reload();
   }
   deleteProductItem(product)
   {
     
    this.spinnerService.show();
     let body={
       "id":product.id
     }
     
     this.designser.deleteProduct(body).subscribe((data)=>
     {
      this.spinnerService.hide();
      location.reload();
      alert("Deleted succesfully");
     })
     
 
   }
}
