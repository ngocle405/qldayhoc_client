import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


import { TranggiaovienService } from 'src/app/services/tranggiaovien.service';

@Component({
  selector: 'app-lophoc',
  templateUrl: './lophoc.component.html',
  styleUrls: ['./lophoc.component.css'],
  providers: [MessageService, ConfirmationService, FormBuilder],
})
export class LophocComponent implements OnInit {

  constructor(private tranggiaovienService:TranggiaovienService,
     private fb: FormBuilder,  
     private router: Router,
      private messageService: MessageService,
     private confirmationService: ConfirmationService,) { }
  lopdays:any=[];
  lophocs:any=[];
  hocphans:any=[];
  baigiangs:any=[];
  mahp:any;
  malop:any;
  magv:any;
  teacher:any;
  formAdd !: FormGroup;
  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher')|| '{}');
    this.formAdd = this.fb.group({
      magv: this.fb.control(this.teacher.magv, [Validators.required]),
      mahp: this.fb.control('', [Validators.required]),
      malop: this.fb.control('', [Validators.required]),
      namhoc: this.fb.control("2020-2021"),
      ghichu: this.fb.control('', [Validators.required]),
      tiethoc: this.fb.control('', [Validators.required]),
    });
   
    this.DanhSachLopGiangDayTrucTuyen(this.teacher.magv);
    this.DsLophoc();
    this.DsHocphan();
  }
  //load danh sách lớp trực tuyến
  DanhSachLopGiangDayTrucTuyen(magv:any) {
    //this.spinner.show();
    this.tranggiaovienService.DanhSachLopGiangDayTrucTuyen(magv).subscribe(data => {
      this.lopdays = data;
   //   this.totalLength = data.length;
      
     // this.spinner.hide();
    });
  }
  //load lớp
  DsLophoc(){
    this.tranggiaovienService.getLophoc().subscribe((data: any) => {
      this.lophocs = data;//lay du lieu 
      this.malop;
    });
  }
  //load học phần
  DsHocphan(){
    this.tranggiaovienService.getHocphan().subscribe((data: any) => {
      this.hocphans = data;//lay du lieu 
      this.mahp;
    });
  }
  //thêm lớp
  ThemlopGiangDay() {
    this.tranggiaovienService.ThemlopGiangDay(this.formAdd.value).subscribe({
      next: (res) => {
        //console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: 'Thêm lớp thành công !',
          });
          this.DanhSachLopGiangDayTrucTuyen(this.teacher.magv);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Thông báo',
          detail: `Đã có lỗi !`,
        });
      },
    });
    
   
  }
  //xóa lớp
  DeleteLopGiangDayTrucTuyen(item: any) {
    
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: 'Bạn có muốn hủy bỏ lớp này ?',
      accept: () => {
       
        this.tranggiaovienService.DeleteLopGiangDayTrucTuyen(item.magiangday).subscribe( {
         next: (res) =>{
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DanhSachLopGiangDayTrucTuyen(this.teacher.magv);
         },
         error: (err) => {
          console.log(err);
        },
        });

      },
     
    });

  }
  
  ClearFormAdd(){
      //this.formAdd.reset();
  }
  closeClick(){
  }
 
}
