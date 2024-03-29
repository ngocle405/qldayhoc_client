import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin.routing';
import { ClassComponent } from './class/class.component';
import { AccountComponent } from './account/account.component';
import { TermComponent } from './term/term.component';
import { PeriodComponent } from './period/period.component';


@NgModule({
  declarations: [AdminComponent, ClassComponent, AccountComponent, TermComponent, PeriodComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminModule { }
