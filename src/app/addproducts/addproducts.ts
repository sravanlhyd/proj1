import { Component } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
    selector:'add-products',
    templateUrl:'./addproducts.html'
})

export class AddProductsComponent{
    validation:boolean;
    fileToUpload:any;
    imgVal:boolean;
    productDetails:any;
    status:boolean;


    constructor(private dataSvc:DataService){
        this.validation=true;
        this.imgVal=false;
        this.status=false;

        this.productDetails={
            productName:'',
            productPrice:'',
            productDiscount:''
        }
    }

    onFileChanged(fileInput:any){
        this.fileToUpload=fileInput.target.files[0];
        console.log("file is:::",this.fileToUpload);
    }

    submit(){
        // this.validation=true;
        if(typeof this.fileToUpload=='undefined'){
            this.imgVal=true;
        }else{
            this.imgVal=false;
        }

        const formData:any=new FormData();
        formData.append("key",this.fileToUpload);

        formData.append("proName", this.productDetails.productName);
        formData.append("proPrice", this.productDetails.productPrice);
        formData.append("proDiscount", this.productDetails.productDiscount);

        this.productDetails={};
        this.dataSvc.SaveProducts(formData)
        .subscribe((result:any)=>{
            this.status=true;
            this.fileToUpload='';
            setTimeout(() => {
                this.status=false;
            }, 3000);
            console.log("=======================",result);
        },err=>{

        })
    }
}