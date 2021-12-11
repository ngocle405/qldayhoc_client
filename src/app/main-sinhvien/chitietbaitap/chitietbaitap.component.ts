import { Component, OnInit } from '@angular/core';
import { makeTemplateObject } from '@angular/localize/src/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-chitietbaitap',
  templateUrl: './chitietbaitap.component.html',
  styleUrls: ['./chitietbaitap.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ChitietbaitapComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
   private trangsinhvienService:TrangsinhvienService) { }
   baitapsinhviens:any;
   sv:any;
   mahoctap:any;
   mabt:any;
   masv:any;
   filename:any;
   tieude:any;
   noidung:any;
   PhotoFilePath:any;
   baitapdanops:any;
  ngOnInit(): void {
    this.sv = JSON.parse(localStorage.getItem('sinhvien')|| '{}');
    this.masv=this.sv.masv;//lấy id sv
    this.mabt = this.route.snapshot.paramMap.get('mabt');//lấy mã btap
    
   // this.baitapsinhvien(this.mabt);
    this.baitapdanop(this.mabt,this.masv);
  }
 
  baitapdanop(mabt: any,masv:any) {
    this.trangsinhvienService.baitapdanop(mabt,masv).subscribe(res => {
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
    this.confirmationService.confirm({
      message: 'Bạn có muốn nộp bài tập này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trangsinhvienService.nopbaitap(val).subscribe((data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã nộp thành công.' });
          this.baitapdanop(this.mabt,this.masv);
        })
      },
    });
    
  }
  //hủy nộp bài tập
  HuyBaiTap(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn hủy nộp bài tập này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.trangsinhvienService.HuyBaiTap(item.id).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã hủy thành công.' });
          this.baitapdanop(this.mabt,this.masv);
        });

      },
    });
  }

  public uploadFilebaitap(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.trangsinhvienService.UploadFileNopBaitap(formData).subscribe((data: any) => {
      this.filename = data.toString();
      this.PhotoFilePath = this.trangsinhvienService.PhotoUrl+"baitap" + this.filename;
    })
  }
  
}
