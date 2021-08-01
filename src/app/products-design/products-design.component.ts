import { Component, OnInit } from '@angular/core';
import { LoadDataApiService } from '../load-data-api.service';
import { ModalService } from '../_modal';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-products-design',
  templateUrl: './products-design.component.html',
  styleUrls: ['./products-design.component.css']
})
export class ProductsDesignComponent implements OnInit {

 config=[];
 noData:boolean;
 showmodal:boolean;
 DesignData:any;
 DescribeData:any;
 showdrop:boolean;
 DesignData1:any=[];
 Designdatas:any;
 myForm: FormGroup= this.fb.group({
  filterProduct: ['']
})
  filteredProducts = [];
  constructor(private modalService: ModalService,private fb:FormBuilder,private designser:LoadDataApiService,private spinnerService: Ng4LoadingSpinnerService
    ) {
  
   }

  ngOnInit() {

    this.magnify("myimage", 3);
    
// if(!this.showdrop)
// {
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
         
         if(product[i].name ===  pro["name"].trim())
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
        
       }
       )
     
  }
 
  openModal(id: string,a:any) {
  
      this.modalService.open(id);
// this.myForm.controls.textarea1.disable();
// this.myForm.controls.textarea1.setValue(a.description)
      this.DescribeData=a;
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }


  magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
  
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Set the position of the magnifier glass: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
  
  

}
