import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

// custom  service
import { PubsubService } from '../services/pubsub.service';
import { DataService } from '../services/data.service';

@Component({
    selector:'login',
    templateUrl:'./login.html',
    styleUrls:['./login.css']
})

export class LoginComponent{
    LoginForm:FormGroup;
    throwErrors:boolean;
    failMsg:boolean;

    constructor(private router:Router,private pubsubSvc:PubsubService,
        private dataSvc:DataService,private fb:FormBuilder){
        this.LoginForm=this.fb.group({
            password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
            email:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        })

        this.throwErrors=false;
        this.failMsg=false;
    }

    login(){
        this.throwErrors=true;
        if(this.LoginForm.invalid){
            this.failMsg=true;
        }else{
            this.failMsg=false;
            this.dataSvc.LoginVerify(this.LoginForm.value)
            .subscribe((result:any)=>{
                if(result.role=="admin"){
                    localStorage.setItem('authToken',result.token);
                    this.pubsubSvc.pubLoginStatus("iAmLoggedIn");
                    this.router.navigateByUrl('admin-dash')
                }else{
                    localStorage.setItem('authToken',result.token);
                    this.pubsubSvc.pubLoginStatus("iAmLoggedIn");
                    this.router.navigateByUrl('dash');
                }
            },err=>{
                console.log("===>>> negative response is ",err)
            })
        }
    }
}