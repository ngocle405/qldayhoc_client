import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginAdminComponent } from './login-admin.component';

@NgModule({
  declarations: [LoginAdminComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginAdminComponent,
      },
  ]),  
  ]
})
export class LoginAdminModule { }