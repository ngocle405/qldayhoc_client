import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiangdayService } from 'src/app/services/giangday.service';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-chitietlophoc',
  templateUrl: './chitietlophoc.component.html',
  styleUrls: ['./chitietlophoc.component.css']
})
export class ChitietlophocComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
   private sinhvienService:SinhvienService, private giangdayService :GiangdayService,) { }
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
  danhsachsinhvien(id:any){
    this.giangdayService.dssv(id).subscribe((data: any) => {
      this.danhsachsinhviens = data;//lay du lieu 
      //console.log(data);
    });
  }
  baigiangsinhvien(id: any) {
    this.sinhvienService.getbaigiangsinhvien(id).subscribe(res => {
      this.baigiangsinhviens = res;
      console.log(res);
    })
  }
  tailieusinhvien(id: any) {
    this.sinhvienService.gettailieusinhvien(id).subscribe(res => {
      this.tailieusinhviens = res;
      console.log(res);
     
    })
  }
  baitapsinhvien(id: any) {
    this.sinhvienService.getbaitapsinhvien(id).subscribe(res => {
      this.baitapsinhviens = res;
      console.log(res);
     
    })
  }
  thaoluansinhvien(id: any) {
    this.sinhvienService.getthaoluansinhvien(id).subscribe(res => {
      this.thaoluansinhviens = res;
      console.log(res);
     
    })
  }

}
