import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GiaovienService } from 'src/app/services/giaovien.service';

@Component({
  selector: 'app-layout-giaovien',
  templateUrl: './layout-giaovien.component.html',
  styleUrls: ['./layout-giaovien.component.css']
})
export class LayoutGiaovienComponent implements OnInit {
  formLogin !: FormGroup ;
  constructor(private router: Router, private giaovienService: GiaovienService) { }
  teacher: any=[];
  hovaten:any;
  avatar:any;
  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher')|| '{}');
      this.hovaten =this.teacher.tengv;
      this.avatar=this.teacher.anhdaidien;
    if(this.teacher!=null){
      this.teacher=parseInt(this.teacher);
    }
  }
  logout() {

    if (this.teacher!= 0) {
      this.giaovienService.logout();
      alert("Đã đăng xuất");
      location.reload();
      setTimeout(() => {
        this.router.navigateByUrl('/giaovien/dashboard');
      }, 1000);
    }
    
  }

  
}
