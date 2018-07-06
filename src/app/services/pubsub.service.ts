import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()

export class PubsubService{

    loginStatus:Subject<any>=new Subject<any>();
    cartStatus:Subject<any>=new Subject<any>();

    constructor(){

    }

    pubLoginStatus(status:string){
        this.loginStatus.next(status)
    }
    subLoginStatus(){
        return this.loginStatus.asObservable();
    }

    pubUpdateCart(msg:String){
        this.cartStatus.next(msg);
    }
    subUpdateCart(){
        return this.cartStatus.asObservable();
    }
}