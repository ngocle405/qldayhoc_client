import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/article/auth.guard';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent, canActivate: [AuthGuard]
      },
  ]),  
  ]
})
export class HomeModule { }