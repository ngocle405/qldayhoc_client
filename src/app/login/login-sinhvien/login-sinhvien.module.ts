import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginSinhvienComponent } from './login-sinhvien.component';



@NgModule({
  declarations: [LoginSinhvienComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,ToastModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginSinhvienComponent,
      },
  ]),  
  ]
})
export class LoginSinhvienModule { }