import { Component } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
    selector:'cart-list',
    templateUrl:'cart-list.html',
    styleUrls:['cart-list.css']
})

export class CartListComponent{
    cartList:any;
    images:any;
    count:number;

    constructor(private dataSvc:DataService){
        this.images=[];
        this.getCartData();
        this.count=10;
    }

    getCartData(){
        this.dataSvc.CartList()
        .subscribe((result:any)=>{
            this.cartList=result.data;
            for (var i = 0; i < this.cartList.length; i++) {
                this.images.push(this.cartList[i].ProdImgName)
            }
            console.log("images array is ",this.images)
        },err=>{

        })
    }
}