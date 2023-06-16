import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClassComponent } from './class/class.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'administration',
      //  loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
       

      },
      {
        path: 'class',
       component:ClassComponent
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
