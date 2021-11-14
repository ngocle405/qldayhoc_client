import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { SinhvienService } from 'src/app/services/sinhvien.service';

@Component({
  selector: 'app-sinhvien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class SinhvienComponent implements OnInit {

  constructor(private sinhvienService: SinhvienService,
    private router: Router,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }
  sinhviens: any = [];
  lophocs:any=[];
  malop:any;
  
 
  //
  formEdit !: FormGroup;
  formAdd !: FormGroup;
  id_Edit = 0;
  //
    //phân trang
    checkSearch: boolean = false;
    pageSize = 5;
    page: any = 1;
    txtSearchName: any = '';
    sortByName: any;
    totalRecords: any;
    sortByCreatedDate:any;
  ngOnInit(): void {
    this.spinner.show();
    this.loadData(1);
   // this.DsSinhvien();
    this.DsLophoc();
    this.formAdd = this.fb.group({
      masv: this.fb.control('', [Validators.required]),
      tensv: this.fb.control('', [Validators.required]),
      malop: this.fb.control('', [Validators.required]),
      ngaysinh: this.fb.control('', [Validators.required]),
      diachinha: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      dienthoai: this.fb.control('', [Validators.required]),
      matkhau: this.fb.control('', [Validators.required]),
      chuyennganh: this.fb.control('', [Validators.required]),
      hedaotao: this.fb.control('', [Validators.required]),
      nganhhoc: this.fb.control('', [Validators.required]),
      nienkhoa: this.fb.control('', [Validators.required]),
    });
    this.formEdit = this.fb.group({
      masv: this.fb.control('', [Validators.required]),
      tensv: this.fb.control('', [Validators.required]),
      malop: this.fb.control('', [Validators.required]),
      ngaysinh: this.fb.control('', [Validators.required]),
      diachinha: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      dienthoai: this.fb.control('', [Validators.required]),
      matkhau: this.fb.control('', [Validators.required]),
      chuyennganh: this.fb.control('', [Validators.required]),
      hedaotao: this.fb.control('', [Validators.required]),
      nganhhoc: this.fb.control('', [Validators.required]),
      nienkhoa: this.fb.control('', [Validators.required]),
      anhdaidien: this.fb.control(''),
    });

  }

  DsSinhvien() {
    //this.spinner.show();
    this.sinhvienService.getAll().subscribe(data => {
      this.sinhviens = data;
      // this.totalLength = data.length;
      console.log(this.sinhviens);
      this.spinner.hide();
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
      this.sinhvienService
        .pagination(data)
        //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.sinhviens = model.data;
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
  DsLophoc(){
    this.sinhvienService.getLophoc().subscribe((data: any) => {
      this.lophocs = data;//lay du lieu 
      this.malop=this.malop;
    });
  }
  add() {
    // var val = {
    //   malop: this.formLop.get('malop')?.value,
    //   tenlop: this.formLop.get('tenlop')?.value,
    //   siso: this.formLop.get('siso')?.value,
    //   gvcn: this.formLop.get('gvcn')?.value,
    //   khoa: this.formLop.get('khoa')?.value,
    // };
    this.sinhvienService.add(this.formAdd.value).subscribe((data: any) => {
      alert(data.toString());
      // this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã thêm thành công' });
      setTimeout(() => {
        this.router.navigateByUrl('/admin/sinhvien');
      }, 1000);
      location.reload();
    })

  }
  onEdit(masv: any): void {

    this.sinhvienService
      .getByid(masv)

      .subscribe({
        next: (loai) => {
          this.id_Edit = loai.masv;
          console.log(loai);
          this.formEdit = this.fb.group({
            masv: this.fb.control(loai.masv, [Validators.required]),
            tensv: this.fb.control(loai.tensv, [Validators.required]),
            malop: this.fb.control(loai.malop, [Validators.required]),
            ngaysinh: this.fb.control(loai.ngaysinh, [Validators.required]),
            diachinha: this.fb.control(loai.diachinha, [Validators.required]),
            email: this.fb.control(loai.email, [Validators.required]),
            dienthoai: this.fb.control(loai.dienthoai, [Validators.required]),
            matkhau: this.fb.control(loai.matkhau, [Validators.required]),
            chuyennganh: this.fb.control(loai.chuyennganh, [Validators.required]),
            hedaotao: this.fb.control(loai.hedaotao, [Validators.required]),
            nganhhoc: this.fb.control(loai.nganhhoc, [Validators.required]),
            nienkhoa: this.fb.control(loai.nienkhoa, [Validators.required]),
            anhdaidien: this.fb.control(loai.anhdaidien, [Validators.required]),
          });
          // this.malop = loai.malop;
          // this.tenlop = loai.tenlop;
          // this.siso = loai.siso;
          // this.gvcn = loai.gvcn;
          // this.khoa = loai.khoa;

        },
      });
  }
  update() {
    if (this.id_Edit > 0) {
      this.sinhvienService.update(this.id_Edit, this.formEdit.value).subscribe((data: any) => {
        alert(data.toString());
        location.reload();
        setTimeout(() => {
          this.router.navigateByUrl('/admin/sinhvien');
        }, 1000);
      })
    }
  }
  closeClick() {
    setTimeout(() => {
      this.router.navigateByUrl('/admin/sinhvien');
    }, 1000);
    //this.clear();
  }
  deleteClick(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn loại bỏ sinh viên này ?',
      accept: () => {
        this.sinhvienService.delete(item.masv).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DsSinhvien();
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
