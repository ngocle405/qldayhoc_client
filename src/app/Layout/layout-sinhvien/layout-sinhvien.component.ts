import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-layout-sinhvien',
  templateUrl: './layout-sinhvien.component.html',
  styleUrls: ['./layout-sinhvien.component.css']
})
export class LayoutSinhvienComponent implements OnInit {
  constructor(private router: Router, private sinhvienService: SinhvienService) { }
  sinhvien: any=[];
  hovaten:any;
  avatar:any;
  ngOnInit(): void {
    this.sinhvien = JSON.parse(localStorage.getItem('sinhvien')|| '{}');
      this.hovaten =this.sinhvien.tensv;
      this.avatar=this.sinhvien.anhdaidien;
    if(this.sinhvien!=null){
      this.sinhvien=parseInt(this.sinhvien);
    }
  }
  logout() {

    if (this.sinhvien!= 0) {
      this.sinhvienService.logout();
      alert("Đã đăng xuất");
      location.reload();
      setTimeout(() => {
        this.router.navigateByUrl('/sinhvien/dashboard');
      }, 1000);
    }
    
  }

}
