import { Component } from '@angular/core';
import {  Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

// ng2 file upload
import { FileUploader } from 'ng2-file-upload';



// custo  service

@Component({
    selector:'admin-dash',
    templateUrl:'./admin-dash.html',
    styleUrls:['./admin-dash.css']
})

export class AdminDashComponent{
    Name:string; 
    myFile:any;
    
    
    constructor(private http:HttpClient){
       
    }
    

    fileChange(files:any){
        
        console.log('adawda===>', files[0])
        this.myFile = files[0];
        console.log(this.myFile);
    }

    submit(){
        let _formData = new FormData();
        _formData.append("Name", this.Name);
        _formData.append("MyFile", this.myFile);

        this.http.post("http://localhost:7070/organics/profile", _formData)
        .subscribe((data) => {
            console.log('data is ==>', data)
        }, function(err) {
            console.log("Error is ==>", err);
        });
    }
}