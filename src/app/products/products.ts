import { Component } from '@angular/core';

import { DataService } from '../services/data.service';
import { PubsubService } from '../services/pubsub.service';

@Component({
    selector: 'products',
    templateUrl: './products.html',
    styleUrls: ['./products.css']
})

export class ProductsComponent {
    searchByName:string;
    products: any;
    images:any;
    ProductId:string;

    constructor(private dataSvc: DataService,private pubSubSvc:PubsubService) {
        this.GetProducts();
        this.images=[];
        this.ProductId='';
        this.searchByName='';
    }

    GetProducts(){
        this.dataSvc.Products()
            .subscribe((result: any) => {
                this.products = result.data;
                for (var i = 0; i < result.data.length; i++) {
                    this.images.push(result.data[i].ProdImgName)
                }
            }, err => {
        })
    }

    sortPrice(p){
        console.log("i am in sort price --------------------",this.products)
        p.sort((a,b)=>{
            return a.ProdPrice-b.ProdPrice
        })
    }

    addCart(p){
        this.dataSvc.ProductIdSend(p._id)
        .subscribe((result:any)=>{
            if(result.status){
            this.pubSubSvc.pubUpdateCart("itemAdded")
            }
        },err=>{

        })
    }
}