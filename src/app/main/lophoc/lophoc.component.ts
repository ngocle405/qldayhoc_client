import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { QuanlythongtinService } from 'src/app/services/quanlythongtin.service';

@Component({
  selector: 'app-lophoc',
  templateUrl: './lophoc.component.html',
  styleUrls: ['./lophoc.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class LophocComponent implements OnInit {

  constructor(
    private quanlythongtinService: QuanlythongtinService,
    private router: Router,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }
  lophocs: any = [];
  ds:any[]=[];
  tenlop: any;
  siso: any;
  gvcn: any;

  khoa: any;
  malop: any;

  //phân trang
 
  //
  formEdit !: FormGroup;
  formAdd !: FormGroup;
  id_Edit = 0;
  //
  checkSearch:boolean=false;
  pageSize = 5;
  page: any = 1;
  txtSearchName: any = '';
  sortByName: any = "chọn";
  totalRecords:any;
  
  //
  //
  ngOnInit(): void {
    this.spinner.show();
   // this.DsLop();
   this.loadData(1);
    this.formAdd = this.fb.group({
      malop: this.fb.control('', [Validators.required]),
      tenlop: this.fb.control('', [Validators.required]),
      siso: this.fb.control('', [Validators.required]),
      gvcn: this.fb.control('', [Validators.required]),
      khoa: this.fb.control('', [Validators.required]),
    });
    this.formEdit = this.fb.group({
      malop: this.fb.control('', [Validators.required]),
      tenlop: this.fb.control('', [Validators.required]),
      siso: this.fb.control('', [Validators.required]),
      gvcn: this.fb.control('', [Validators.required]),
      khoa: this.fb.control('', [Validators.required]),
    });

  }
  loadData(page: any): void {
    // this.spinner.show();
    if (this.checkSearch == true) this.page = 1;
    else this.page = page;
    var data = {
      page: this.page,
      pageSize: this.pageSize,
      nameSearch: this.txtSearchName,
      sortByName: this.sortByName,
     // sortByCreatedDate: this.sortByCreatedDate,
    }
    setTimeout(() => {
      this.quanlythongtinService
        .DanhSachLop(data)
         //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.lophocs = model.data;
            this.totalRecords = model.totalItems;
            this.checkSearch = false;
              this.spinner.hide();
          },

        });
    }, 300);
  }

  onSearch(): void {
    this.checkSearch = true;
    this.loadData(1);
  }

  add() {
    // var val = {
    //   malop: this.formAdd.get('malop')?.value,
    //   tenlop: this.formAdd.get('tenlop')?.value,
    //   siso: this.formAdd.get('siso')?.value,
    //   gvcn: this.formAdd.get('gvcn')?.value,
    //   khoa: this.formAdd.get('khoa')?.value,
    // };
    this.quanlythongtinService.ThemLop(this.formAdd.value).subscribe((data: any) => {
       alert(data.toString());
     // this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã thêm thành công' });
       this.loadData(1);
      // location.reload();
    })

  }
  onEdit(mahp: any): void {
  
    this.quanlythongtinService
      .ChiTietLop(mahp)

      .subscribe({
        
        next: (loai) => {
          
          this.id_Edit=loai.malop;
          console.log(loai);
          this.formEdit = this.fb.group({
            malop: this.fb.control(loai.malop, [Validators.required]),
            tenlop: this.fb.control(loai.tenlop, [Validators.required]),
            siso: this.fb.control(loai.siso, [Validators.required]),
            gvcn: this.fb.control(loai.gvcn, [Validators.required]),
            khoa: this.fb.control(loai.khoa, [Validators.required]),
          });
          // this.malop = loai.malop;
          // this.tenlop = loai.tenlop;
          // this.siso = loai.siso;
          // this.gvcn = loai.gvcn;
          // this.khoa = loai.khoa;
       
        },
      });
  }
  update(){
    if(this.id_Edit>0){
      this.quanlythongtinService.UpdateLop(this.id_Edit,this.formEdit.value).subscribe((data: any) => {
        alert(data.toString());
     
         setTimeout(() => {
           this.loadData(1);
          // this.router.navigateByUrl('/lophoc');
        }, 1000);
      })
    }
  }
  closeClick() {
    setTimeout(() => {
      this.loadData(1);
      // this.router.navigateByUrl('/lophoc');
    }, 1000);
    //this.clear();
  }
  deleteClick(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa lớp học này ?',
      accept: () => {
        this.quanlythongtinService.DeleteLop(item.malop).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.loadData(1);
        });

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Thông báo ', detail: 'Bạn đã chọn không ! ' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Thông báo ', detail: 'Bạn đã chọn Thoát !' });
            break;
        }
      }
    });

  }
  clearFormAdd(){
    this.formAdd.reset();
  }
}
