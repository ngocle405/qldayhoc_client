import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-baitapdanop',
  templateUrl: './baitapdanop.component.html',
  styleUrls: ['./baitapdanop.component.css']
})
export class BaitapdanopComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private sinhvienService:SinhvienService) { }
  mabt:any;
  baitapsinhviens:any;
  baitapdanops:any;
  ngOnInit(): void {
    this.mabt = this.route.snapshot.paramMap.get('mabt');
    this.baitapsinhvien(this.mabt);
    this.baitapdanop(this.mabt);
  }
  baitapsinhvien(mabt: any) {
    this.sinhvienService.getidbaitap(mabt).subscribe(res => {
      this.baitapsinhviens = res;
      console.log(res);
     
    })
  }
  baitapdanop(mabt: any) {
    this.sinhvienService.baitapdanop(mabt).subscribe(res => {
      this.baitapdanops = res;
      console.log(res);
     
    })
  }

}
