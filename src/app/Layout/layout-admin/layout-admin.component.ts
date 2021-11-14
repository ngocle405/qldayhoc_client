import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCPService } from 'src/app/services/admin-cp.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent implements OnInit {

  constructor(private router: Router, private adminCPService: AdminCPService) { }
  admin: any=[];
  hovaten:any;
  ngOnInit(): void {
    this. admin = JSON.parse(localStorage.getItem('admin')|| '{}');
      this.hovaten =this. admin.hovaten;
    if(this.admin!=null){
      this.admin=parseInt(this.admin);
    }
  }
  logout() {

    if (this.admin!= 0) {
      this.adminCPService.logout();
      alert("Đã đăng xuất");
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 1000);
    }
    
  }

}
