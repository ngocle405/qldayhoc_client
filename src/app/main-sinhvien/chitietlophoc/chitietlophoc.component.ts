import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-chitietlophoc',
  templateUrl: './chitietlophoc.component.html',
  styleUrls: ['./chitietlophoc.component.css']
})
export class ChitietlophocComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
   private trangsinhvienService:TrangsinhvienService) { }
  sv:any;
  mahoctap:any;
  magiangday:any;
  baigiangsinhviens:any;
  tailieusinhviens:any;
  baitapsinhviens:any;
  thaoluansinhviens:any;
  danhsachsinhviens:any;
  ngOnInit(): void {
    this.sv = JSON.parse(localStorage.getItem('sinhvien')|| '{}');
    this.mahoctap = this.route.snapshot.paramMap.get('mahoctap');
    this.magiangday = this.route.snapshot.paramMap.get('magiangday');
    this.baigiangsinhvien(this.mahoctap);
    this.tailieusinhvien(this.mahoctap);
    this.baitapsinhvien(this.mahoctap);
    this.thaoluansinhvien(this.mahoctap);
    //this.danhsachsinhvien(this.magiangday);
  }
  // danhsachsinhvien(id:any){
  //   this.giangdayService.dssv(id).subscribe((data: any) => {
  //     this.danhsachsinhviens = data;//lay du lieu 
  //     //console.log(data);
  //   });
  // }
  baigiangsinhvien(id: any) {
    this.trangsinhvienService.getbaigiangsinhvien(id).subscribe(res => {
      this.baigiangsinhviens = res;
     
    })
  }
  tailieusinhvien(id: any) {
    this.trangsinhvienService.gettailieusinhvien(id).subscribe(res => {
      this.tailieusinhviens = res;
    })
  }
  baitapsinhvien(id: any) {
    this.trangsinhvienService.getbaitapsinhvien(id).subscribe(res => {
      this.baitapsinhviens = res;
    })
  }
  thaoluansinhvien(id: any) {
    this.trangsinhvienService.getthaoluansinhvien(id).subscribe(res => {
      this.thaoluansinhviens = res;
    })
  }

}
