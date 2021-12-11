import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './article/auth.guard';
import { GiaovienGuard } from './article/giaovien.guard';
import { SinhvienGuard } from './article/sinhvien.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./lms/lms/lms.module').then((m) => m.LmsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule), canActivate: [AuthGuard]
  },
  {
    path: 'giaovien',
    loadChildren: () => import('./main-giaovien/maingiaovien.module').then((m) => m.MaingiaovienModule), canActivate: [GiaovienGuard]
  },
  {
    path: 'sinhvien',
    loadChildren: () => import('./main-sinhvien/main-sinhvien.module').then((m) => m.MaisinhvienModule), canActivate: [SinhvienGuard]
  },

  {
    path: 'admin/login',
    loadChildren: () => import('./login/login-admin/loginAdmin.module').then((m) => m.LoginAdminModule),
  },
  {
    path: 'giaovien/login',
    loadChildren: () => import('./login/login-giaovien/login-giaovien.module').then((m) => m.LoginGiaovienModule),
  },
  {
    path: 'sinhvien/login',
    loadChildren: () => import('./login/login-sinhvien/login-sinhvien.module').then((m) => m.LoginSinhvienModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
