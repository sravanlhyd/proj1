import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// ng2 file upload

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
// primeng modules
import {ButtonModule} from 'primeng/button';
// custom pipes 
import { FilterProductName } from './pipes/products-filter-name';
// custom services
import { DataService } from './services/data.service';

// customs module
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
// custom component
import { LoginComponent } from './login/login';
import { AdminRegisterComponent } from './admin-register/admin-register'; 
import { RegisterComponent } from './register/register';
import { TopnavComponent } from './topnav/topnav';
import { DashComponent } from './dash/dash';
import { AdminDashComponent } from './admin-dash/admin-dash';
import { ProductsComponent } from './products/products';
import { Partials2Component } from './partials2/partials2';
import { AddProductsComponent } from './addproducts/addproducts';
import { CartListComponent } from './cart-list/cart-list';

// custom services
import { PubsubService } from './services/pubsub.service';
// adding custom http interceptors
import { AddHeaderInterceptor} from './services/add-header-inter';

@NgModule({

  declarations: [
    AppComponent,

    LoginComponent,
    AdminRegisterComponent,
    RegisterComponent,
    TopnavComponent,
    DashComponent,
    AdminDashComponent,
    ProductsComponent,
    Partials2Component,
    AddProductsComponent,
    CartListComponent,
    // pipes
    FilterProductName,
    // ng2 file upload
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path:'adminRegister',component:AdminRegisterComponent},
      { path: 'dash', component: DashComponent ,children:[
        {
          path: 'products',
          component: ProductsComponent
       },
       {
        path: 'partials2',
        component: Partials2Component
     },
     {
      path: 'cartList',
      component: CartListComponent
   }
      ]},
     {path:'admin-dash',component:AdminDashComponent,children:[
       {path:'addproducts',component:AddProductsComponent}
     ]} 

      
    ]),
    // prime ng 
    ButtonModule
  ],
  providers: [
    PubsubService,
    DataService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AddHeaderInterceptor,
    //   multi: true,
    // }
    // prime ng services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
