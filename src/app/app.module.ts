import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginSinhvienComponent } from './login/login-sinhvien/login-sinhvien.component';

import { CommonComponent } from './lms/common/common.component';


@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   
    BrowserAnimationsModule,
 
    
  //  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
