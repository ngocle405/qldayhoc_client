import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutSinhvienComponent } from './layout-sinhvien/layout-sinhvien.component';
//import { LayoutGiaovienComponent } from './layout-giaovien/layout-giaovien.component';



@NgModule({
  declarations: [
    //LayoutAdminComponent
  
    //LayoutGiaovienComponent
  
   // LayoutSinhvienComponent
  ],
  imports: [
    FormsModule,
   
    CommonModule,
  
    ReactiveFormsModule,

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
   
    CommonModule,
 
  ],
})
export class LayoutModule { }