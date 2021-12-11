import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranggiaovienService } from 'src/app/services/tranggiaovien.service';

@Component({
  selector: 'app-chitietbaitap',
  templateUrl: './chitietbaitap.component.html',
  styleUrls: ['./chitietbaitap.component.css']
})
export class ChitietbaitapComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private tranggiaovienService:TranggiaovienService) { }
  mabt:any;
  ctbaitaps:any;
  baitapdanops:any;
  ngOnInit(): void {
    this.mabt = this.route.snapshot.paramMap.get('mabt');
    this.ChiTietBaiTap(this.mabt);
    this.baitapdanop(this.mabt);
  }
  //xem chi tiết bài tập
  ChiTietBaiTap(mabt: any) {
    this.tranggiaovienService.ChiTietBaiTap(mabt).subscribe(res => {
         this.ctbaitaps=res;
    })
  }
  //ds bài tập sv đã nộp có mã bt
  baitapdanop(mabt: any) {
    this.tranggiaovienService.BaiTapDaNop(mabt).subscribe(res => {
      this.baitapdanops = res;
      console.log(res);
     
    })
  }

}
