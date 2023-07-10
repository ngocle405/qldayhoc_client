import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClassComponent } from './class/class.component';
import { AccountComponent } from './account/account.component';
import { TermComponent } from './term/term.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'term',
      //  loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
       component:TermComponent
      },
      {
        path: 'class',
       component:ClassComponent
      },
      {
        path: 'account',
        component:AccountComponent
      },
      
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // },
     //  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
