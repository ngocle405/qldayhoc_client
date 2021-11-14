import { Component, OnInit } from '@angular/core';
import { makeTemplateObject } from '@angular/localize/src/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-chitietbaitap',
  templateUrl: './chitietbaitap.component.html',
  styleUrls: ['./chitietbaitap.component.css']
})
export class ChitietbaitapComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
   private sinhvienService:SinhvienService) { }
   baitapsinhviens:any;
   sv:any;
   mahoctap:any;
   mabt:any;
   filename:any;
   tieude:any;
   noidung:any;
   PhotoFilePath:any;
   baitapdanops:any;
  ngOnInit(): void {
    this.sv = JSON.parse(localStorage.getItem('sinhvien')|| '{}');
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


 
  addnopbaitap() {
    var val = {
      mabt: JSON.parse(this.mabt),
      nguoitao: this.sv.tensv,
      masv:this.sv.masv,
      filename: this.filename,
      tieude: this.tieude,
      noidung: this.noidung,
    }
    this.sinhvienService.nopbaitap(val).subscribe((data: any) => {
      alert(data.toString());
    })
  }
  public uploadFilebaitap(event: any) {
    var file = event.target.files[0];

    console.log(file)
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.sinhvienService.UploadFileNopBaitap(formData).subscribe((data: any) => {
      this.filename = data.toString();
      this.PhotoFilePath = this.sinhvienService.PhotoUrl + this.filename;
    })
  }
}
