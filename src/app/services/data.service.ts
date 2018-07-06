import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class DataService{
    data:any;

    constructor(private http:HttpClient){

    }
    register(payload){
        let url='http://localhost:7070/api/register';
        return this.http.post(url,payload);
    }

    LoginVerify(payload){
        let url='http://localhost:7070/api/login';
        return this.http.post(url,payload);
    }

    SaveProducts(payload){
        let url='http://localhost:7070/api/products';
        return this.http.post(url,payload)
    }

    Products(){
        let url="http://localhost:7070/api/products";
        return this.http.get(url)
    }

    ProductIdSend(payload){
        this.data={
            ProductId:payload
        }
        let url="http://localhost:7070/api/productid";
        return this.http.post(url,this.data)
    }

    CartCount(){
        let url="http://localhost:7070/api/cart";
        return this.http.get(url);
    }

    CartList(){
        let url="http://localhost:7070/api/cartlist";
        return this.http.get(url);
    }

}