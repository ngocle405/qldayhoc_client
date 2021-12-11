import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LophocComponent } from './lophoc/lophoc.component';
import { Routes ,RouterModule} from '@angular/router';
import { MainGiaovienComponent } from './main-giaovien.component';
import { LayoutGiaovienComponent } from '../Layout/layout-giaovien/layout-giaovien.component';
import { LayoutModule } from '../Layout/Layout.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { GiangdayComponent } from './giangday/giangday.component';

//
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HoctructuyenComponent } from './hoctructuyen/hoctructuyen.component';
//
import { NgbModule,NgbPaginationModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { HosogiaovienComponent } from './hosogiaovien/hosogiaovien.component';
import { ChitietbaitapComponent } from './chitietbaitap/chitietbaitap.component';
export const mainRoutes: Routes = [
    {
        path: '',
        component: MainGiaovienComponent,
        children: [
            { path: 'DanhSachLopGiangDayTrucTuyen', component: LophocComponent},
            { path: 'XemChiTietLopGiangDay/:magiangday', component: GiangdayComponent},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'hoctructuyen', component: HoctructuyenComponent},
            { path: 'ChiTietBaiTap/:mabt', component: ChitietbaitapComponent},
            { path: 'hosogiaovien/:magv', component: HosogiaovienComponent},
        
        ]
    }
]


@NgModule({
    declarations: [
        MainGiaovienComponent,//import main
        LophocComponent,
        LayoutGiaovienComponent,
       
        DashboardComponent,
        GiangdayComponent,
        HoctructuyenComponent,
   
        HosogiaovienComponent,
        ChitietbaitapComponent,
      
        //import layout
    ],
    imports: [
        LayoutModule,
        CommonModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        TableModule,
        NgxSpinnerModule,
        NgbPaginationModule,
        ConfirmPopupModule,
        RouterModule.forChild(mainRoutes)
    ],
    
})
export class MaingiaovienModule { }
