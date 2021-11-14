import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LophocComponent } from './lophoc/lophoc.component';
import { Routes ,RouterModule} from '@angular/router';
import { MainGiaovienComponent } from './main-giaovien.component';
import { LayoutGiaovienComponent } from '../Layout/layout-giaovien/layout-giaovien.component';
import { LayoutModule } from '../Layout/Layout.module';
import { MainComponent } from '../main/main.component';
import { GiaovienGuard } from '../article/giaovien.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GiangdayComponent } from './giangday/giangday.component';

//
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HoctructuyenComponent } from './hoctructuyen/hoctructuyen.component';
//
import { NgbModule,NgbPaginationModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BaitapdanopComponent } from './baitapdanop/baitapdanop.component';
import { HosogiaovienComponent } from './hosogiaovien/hosogiaovien.component';
export const mainRoutes: Routes = [
    {
        path: '',
        component: MainGiaovienComponent,
        children: [
            { path: 'lophoc', component: LophocComponent},
            { path: 'lophoc/giangday/:magiangday', component: GiangdayComponent},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'hoctructuyen', component: HoctructuyenComponent},
            { path: 'baitapdanop/:mabt', component: BaitapdanopComponent},
            { path: 'hosogiaovien', component: HosogiaovienComponent},
        
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
        BaitapdanopComponent,
        HosogiaovienComponent,
      
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
export class MaingiaovienModule { }
