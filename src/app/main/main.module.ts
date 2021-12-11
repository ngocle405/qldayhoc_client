import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';



import { InputTextareaModule } from 'primeng/inputtextarea';



import { AuthGuard } from '../article/auth.guard';

import { LayoutModule } from '../Layout/Layout.module';

import { AdminCPComponent } from './admin-cp/admin-cp.component';
import { HocphanComponent } from './hocphan/hocphan.component';
//
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LayoutAdminComponent } from '../Layout/layout-admin/layout-admin.component';
import { GiaovienComponent } from './giaovien/giaovien.component';
import { XemhosoComponent } from './xemhoso/xemhoso.component';
import { LophocComponent } from './lophoc/lophoc.component';
import { SinhvienComponent } from './sinhvien/sinhvien.component';
import { NgbModule,NgbPaginationModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TailieuComponent } from './tailieu/tailieu.component';
export const mainRoutes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule)
      },
      //
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule)
      },
      //
      {
        path: 'giaovien', component: GiaovienComponent, canActivate: [AuthGuard]

      },
      //
      {
        path: 'xemhoso/:magv', component: XemhosoComponent, canActivate: [AuthGuard]

      },
      //
   
      //
      {
        path: 'hocphan', component: HocphanComponent, canActivate: [AuthGuard]
      },
      //
      {
        path: 'lophoc', component: LophocComponent, canActivate: [AuthGuard]
      },
      //
      {
        path: 'sinhvien', component: SinhvienComponent, canActivate: [AuthGuard]
      },
       //
       {
        path: 'tailieu', component: TailieuComponent, canActivate: [AuthGuard]
      },
    ],
    //

  },
];

@NgModule({
  declarations: [
    MainComponent,
    AdminCPComponent, HocphanComponent, LayoutAdminComponent, GiaovienComponent, 
    XemhosoComponent, LophocComponent, SinhvienComponent, TailieuComponent,
  ],
  imports: [
    LayoutModule,
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
export class MainModule { }
