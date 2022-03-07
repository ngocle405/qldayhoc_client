import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { QuanlythongtinService } from 'src/app/services/quanlythongtin.service';

@Component({
  selector: 'app-giaovien',
  templateUrl: './giaovien.component.html',
  styleUrls: ['./giaovien.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class GiaovienComponent implements OnInit {

  constructor(private quanlythongtinService: QuanlythongtinService,
    private router: Router,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }
  giaoviens: any = [];
  matkhau: any;
  quoctich: any;
  magv: any;
  tengv: any;
  diachi: any;
  email: any;
  dienthoai: any;
  ngaysinh: any;
  //phân trang
  checkSearch: boolean = false;
  pageSize = 5;
  page: any = 1;
  txtSearchName: any = '';
  sortByName: any;
  totalRecords: any;
  sortByCreatedDate:any;
  //
  searchText: any;
  //
  formAdd !: FormGroup;
  //
  ngOnInit(): void {
    this.spinner.show();
    // this.DsGiaoVien();
    this.loadData(1);
    this.formAdd = this.fb.group({
      magv: this.fb.control('', [Validators.required]),
      tengv: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      dienthoai: this.fb.control('', [Validators.required]),
      diachi: this.fb.control('', [Validators.required]),
      matkhau: this.fb.control('', [Validators.required, Validators.minLength(6),]),
      ngaysinh: this.fb.control('', [Validators.required]),
      chuyennganh: this.fb.control('', [Validators.required]),
      quoctich: this.fb.control(''),

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
       sortByCreatedDate: this.sortByCreatedDate,
    }
    setTimeout(() => {
      this.quanlythongtinService
        .DanhSachGiaoVien(data)
        //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.giaoviens = model.data;
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
  ThemGiaoVien() {
    var val = {
      magv: this.formAdd.get('magv')?.value,
      tengv: this.formAdd.get('tengv')?.value,
      email: this.formAdd.get('email')?.value,
      dienthoai: this.formAdd.get('dienthoai')?.value,
      matkhau: this.formAdd.get('matkhau')?.value,
      diachi: this.formAdd.get('diachi')?.value,
      ngaysinh: this.formAdd.get('ngaysinh')?.value,
      chuyennganh: this.formAdd.get('chuyennganh')?.value,
      quoctich: this.formAdd.get('quoctich')?.value,
    };
    this.quanlythongtinService.ThemGiaoVien(val).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thông báo',
          detail: 'Thêm giáo viên thành công !',
        });
        setTimeout(() => {
          this.loadData(1);
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Thông báo',
          detail: `Đã có lỗi !`,
        });
      },
    })

  }

  closeClick() {
    setTimeout(() => {
      this.router.navigateByUrl('/admin/giaovien');
    }, 1000);
    //this.clear();
  }
  DeleteGiaoVien(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa giáo viên này ?',
      accept: () => {
        this.quanlythongtinService.DeleteGiaoVien(item.magv).subscribe(data => {
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
  clearFormAdd() {
    this.formAdd.reset();
  }

}
