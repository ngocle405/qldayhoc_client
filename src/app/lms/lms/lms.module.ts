import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';



import { InputTextareaModule } from 'primeng/inputtextarea';




import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NgbModule,NgbPaginationModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LmsComponent } from './lms.component';

export const mainRoutes: Routes = [

  {
    path: '',
    component: LmsComponent,
    children: [
     
       //
       {
        path: '', component: LmsComponent
      },
    ],
    //

  },
];

@NgModule({
  declarations: [
   LmsComponent
  ],
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    InputTextareaModule,
    DialogModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    NgxSpinnerModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,

    RouterModule.forChild(mainRoutes)
  ],
  exports: [RouterModule],

})
export class LmsModule { }
