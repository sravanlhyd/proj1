import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms' 
import { Router } from '@angular/router';
// custom service
import { DataService } from '../services/data.service';
// prime ng 

@Component({
    selector:'admin-register',
    templateUrl:'./admin-register.html',
    styleUrls:['./admin-register.css']
})

export class AdminRegisterComponent{
    RegisterForm:FormGroup;
    throwErrors:boolean;
    failMsg:boolean;
    successMsg:boolean;


    constructor(private fb:FormBuilder,private router:Router,private dataSvc:DataService,
        ){
           
        this.RegisterForm=this.fb.group({
            userName:['',[Validators.required]],
            password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
            email:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            contact:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
            role:['admin']
        })
        
        this.throwErrors=false;
        this.failMsg=false;
        this.successMsg=false;
    }


    register(){
        this.throwErrors=true;
        if(this.RegisterForm.invalid){
            this.failMsg=true;
        }else{
            this.failMsg=false;
            this.dataSvc.register(this.RegisterForm.value)
            .subscribe((result:any)=>{
            if(result.status){
                this.successMsg=true;
                console.log("i am in true result",result)
                setTimeout(() => {
                    this.router.navigateByUrl('');                    
                }, 3000);
            }
        },err=>{

            console.log("negative response is=====>>>",err)
        })

            this.successMsg=true;
            console.log("register details are:=====>>",this.RegisterForm.value);
        }
    }
}