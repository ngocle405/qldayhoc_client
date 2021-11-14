import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiaovienService } from '../services/giaovien.service';

@Component({
  selector: 'app-main-giaovien',
  templateUrl: './main-giaovien.component.html',
  styleUrls: ['./main-giaovien.component.css']
})
export class MainGiaovienComponent implements OnInit {

  constructor(private router: Router, private giaovienService: GiaovienService) { }
  teacher: any=[];
  hovaten:any;
  avatar:any;
  chuyennganh:any;
  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher')|| '{}');
      this.hovaten =this.teacher.tengv;
      this.avatar=this.teacher.anhdaidien;//lay tt anh dai dien
      this.chuyennganh=this.teacher.chuyennganh;
      console.log(this.hovaten);
    if(this.teacher!=null){
      this.teacher=parseInt(this.teacher);
    }
    
  }
  // logout() {

  //   if (this.teacher!= 0) {
  //     this.giaovienService.logout();
  //     alert("Đã đăng xuất");
  //     setTimeout(() => {
  //       this.router.navigateByUrl('/giaovien/lophoc');
  //     }, 1000);
  //   }
    
  // }

}
