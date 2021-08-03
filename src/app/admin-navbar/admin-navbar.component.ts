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
import { NgxImageCompressService } from 'ngx-image-compress';
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
  imgResultAfterCompress:string;
  submitted = false;
  prodID=[];
  prodId1:any=[];
  constructor(private route:ActivatedRoute,private http:HttpClient, private imageCompress: NgxImageCompressService,private formBuilder: FormBuilder,private designser:LoadDataApiService,private spinnerService: Ng4LoadingSpinnerService,private modalService: ModalService,private router:Router) { }

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
  //   changeFile(file) {
  //   //  console.log(file)
  //     return  new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         console.log(file)
  //         if(file.type === "image/png")
  //         {
  //           reader.onload = () => resolve(reader.result.toString().split('data:image/png;base64,')[1]);
  //         }
  //         else
  //         reader.onload = () => resolve(reader.result.toString().split('data:image/jpeg;base64,')[1]);
  //         reader.onerror = error => reject(error);
  //     });
  // }
  
  async  reduce_image_file_size(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
    let resized_base64 = await new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL()) // this will return base64 image results after resize
        }
    });
    return resized_base64;
}


async  image_to_base64(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        console.log(file)
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
            console.log(error)
            alert('An Error occurred please try again, File might be corrupt');
        };
        fileReader.readAsDataURL(file);
    });
    return result_base64;
}

async process_image(e) {
  this.imgdata=[];
  if (e.target.value) 
  {
 const files = e.target.files; 
  for(let i=0;i<files.length;i++)
  {
    const res = await this.image_to_base64(files[i]);
    if (res) {
        const old_size =await this. calc_image_size(res);
        
            const resized = await this.reduce_image_file_size(res);
            const new_size =await  this.calc_image_size(resized)
            console.log('new_size=> ', new_size, 'KB');
            console.log('old_size=> ', old_size, 'KB');
           this.imgdata.push(resized.toString().split("data:image/png;base64,")[1])
           console.log(this.imgdata)
        
    } else {
        console.log('return err')
        return null;
    }
  }
}
}

 calc_image_size(image) {
    let y = 1;
    if (image.endsWith('==')) {
        y = 2
    }
    const x_size = (image.length * (3 / 4)) - y
          return Math.round(x_size / 1024)
  }

  // async  detectFiles(event) {

  //       if (event.target.value) {
  //           const files = event.target.files;
  //          for(let i=0;i<files.length;i++)
  //        await   this.changeFile(files[i]).then((base64: string): any => {
  //              // console.log(base64)
  //               console.log(this.compressFile(base64));
  //              // this.imgdata.push(this.compressFile(base64));
  //              // this.imgdata.push(this.b64toBlob([base64], Blob,""));
  //             //  console.log(this.imgdata)
              
  //           });
  //       } 
        
  //   }
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
    //this.reloadPage(); 
    }

      }
   multipleApicall(body)
   {
         
 
  const promise = this.designser.uploadData(body).toPromise();
  console.log(promise);  
  promise.then((data)=>{
    // this.Movie = JSON.stringify(data)
    console.log(JSON.stringify(data));
  }).catch((error)=>{
   // console.log("Promise rejected with " + JSON.stringify(error));
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

