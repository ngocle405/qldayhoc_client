import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-layout-sinhvien',
  templateUrl: './layout-sinhvien.component.html',
  styleUrls: ['./layout-sinhvien.component.css']
})
export class LayoutSinhvienComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute, private trangsinhvienService: TrangsinhvienService) { }
  sinhvien: any=[];
  hovaten:any;
  avatar:any;
  masv:any;
  ngOnInit(): void {
    this.sinhvien = JSON.parse(localStorage.getItem('sinhvien')|| '{}');
    this.masv = this.route.snapshot.paramMap.get('masv');
      this.hovaten =this.sinhvien.tensv;
      this.avatar=this.sinhvien.anhdaidien;
      this.masv=this.sinhvien.masv;
    if(this.sinhvien!=null){
      this.sinhvien=parseInt(this.sinhvien);
    }

    //
    this.Layoutsinhvien(this.masv);
  }
  Layoutsinhvien(masv:any){
    this.trangsinhvienService.ChiTietSinhVien(masv).subscribe(res=>{
      this.sinhvien=res;
    });

  }
  logout() {

    if (this.sinhvien!= 0) {
      this.trangsinhvienService.logout();
      alert("Đã đăng xuất");
      location.reload();
      setTimeout(() => {
        this.router.navigateByUrl('/sinhvien/dashboard');
      }, 1000);
    }
    
  }

}
