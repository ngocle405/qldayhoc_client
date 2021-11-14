import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginGiaovienComponent } from './login-giaovien.component';


@NgModule({
  declarations: [LoginGiaovienComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginGiaovienComponent,
      },
  ]),  
  ]
})
export class LoginGiaovienModule { }