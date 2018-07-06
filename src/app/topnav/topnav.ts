import { Component} from '@angular/core';
import { Router } from '@angular/router';

// custom 
import { PubsubService } from '../services/pubsub.service';
import { DataService } from '../services/data.service';

@Component({
    selector:'topnav',
    templateUrl:'./topnav.html',
    styleUrls:['./topnav.css']
})

export class TopnavComponent{
    isUserLoggedIn:boolean;
    cartValue:number;
    call:boolean

    constructor(private router:Router,private pubsubSvc:PubsubService,
        private dataSvc:DataService){
        this.cartValue=0;
        this.updateTopNav();
        this.updateTop();
        this.ifItemAdded();
        this.updateCart();
        
        // setInterval(()=>{
        //     this.updateCart()
        // },2000)
    }

    updateTopNav(){
        this.pubsubSvc.subLoginStatus()
        .subscribe(result=>{
            if(result=="iAmLoggedIn"){
                this.isUserLoggedIn=true;
            }else{
                this.isUserLoggedIn=false;
                this.router.navigateByUrl('');
            }
        },err=>{

        })
    }

    updateTop(){
        if(localStorage.getItem('authToken')){
            this.isUserLoggedIn=true;
        }else{
            this.isUserLoggedIn=false;
        }
    }

    logout(){
        localStorage.removeItem('authToken');
        this.pubsubSvc.pubLoginStatus('loggedout'); 
    }

    

    ifItemAdded(){
        this.pubsubSvc.subUpdateCart()
        .subscribe((result:any)=>{
            if(result=="itemAdded"){
                this.updateCart();
            }
        },err=>{

        })
    }

    updateCart(){
        this.dataSvc.CartCount()
        .subscribe((result:any)=>{
            console.log("i am in -------------------------",result)
                this.cartValue=result.data.length;
        },err=>{
            
        })
    }

}