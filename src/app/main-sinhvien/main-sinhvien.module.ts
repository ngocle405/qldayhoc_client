import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes ,RouterModule} from '@angular/router';


import { LayoutModule } from '../Layout/Layout.module';




//
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';

//
import { NgbModule,NgbPaginationModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MainSinhvienComponent } from './main-sinhvien.component';
import { LayoutSinhvienComponent } from '../Layout/layout-sinhvien/layout-sinhvien.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HoctructuyenComponent } from './hoctructuyen/hoctructuyen.component';

import { GochoctapComponent } from './gochoctap/gochoctap.component';
import { ChitietlophocComponent } from './chitietlophoc/chitietlophoc.component';
import { ChitietbaitapComponent } from './chitietbaitap/chitietbaitap.component';
import { HosocanhanComponent } from './hosocanhan/hosocanhan.component';
export const mainRoutes: Routes = [
    {
        path: '',
        component: MainSinhvienComponent,
        children: [
            // { path: 'lophoc', component: LophocComponent},
            // { path: 'lophoc/giangday/:magiangday', component: GiangdayComponent},
             { path: 'dashboard', component: DashboardComponent},
             { path: 'hoctructuyen', component: HoctructuyenComponent},
             { path: 'danhsachlophoc', component: GochoctapComponent},
             { path: 'chitietlophoc/:mahoctap', component: ChitietlophocComponent},
             { path: 'chitietbaitap/:mabt', component: ChitietbaitapComponent},
             { path: 'hosocanhan', component: HosocanhanComponent},
        
        ]
    }
]


@NgModule({
    declarations: [
        MainSinhvienComponent,//import main
        LayoutSinhvienComponent, DashboardComponent, HoctructuyenComponent,  GochoctapComponent, ChitietlophocComponent, ChitietbaitapComponent, HosocanhanComponent,
  
      
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
        RouterModule.forChild(mainRoutes)
    ],
    
})
export class MaisinhvienModule { }
