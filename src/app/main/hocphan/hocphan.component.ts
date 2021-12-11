import { Component, OnInit } from '@angular/core';


import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuanlythongtinService } from 'src/app/services/quanlythongtin.service';
@Component({
  selector: 'app-hocphan',
  templateUrl: './hocphan.component.html',
  styleUrls: ['./hocphan.component.css'],
  providers: [MessageService, ConfirmDialogModule, ConfirmationService]
})
export class HocphanComponent implements OnInit {
  formAdd !: FormGroup ;
  formEdit !:FormGroup;
  id_Edit:any;
  //phân trang
  
  
  //
 
  hocphans: any = [];
  mahp: any;
 
  checkSearch:boolean=false;
  pageSize = 5;
  page: any = 1;
  txtSearchName: any = '';
  sortByName: any = "chọn";
  totalRecords:any;
  //
  searchText: any;
  constructor(private quanlythongtinService: QuanlythongtinService,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
   // this.DsHocPhan();
    this.formAdd = this.fb.group({
      tenhp: this.fb.control('', [Validators.required]),
      code: this.fb.control('', [Validators.required]),
      hocky: this.fb.control('', [Validators.required]),
      sotc: this.fb.control('', [Validators.required]),
      tieude: this.fb.control('', [Validators.required]),
      heso: this.fb.control('',[Validators.required]),
      ghichu: this.fb.control(''),
    });
    //khởi tạo form edit
    this.formEdit = this.fb.group(
      {
        mahp: this.fb.control('', [Validators.required]),
        tenhp: this.fb.control('', [Validators.required]),
        code: this.fb.control('', [Validators.required]),
        hocky: this.fb.control('', [Validators.required]),
        sotc: this.fb.control('', [Validators.required]),
        tieude: this.fb.control('', [Validators.required]),
        heso: this.fb.control('', [Validators.required]),
        ghichu: this.fb.control(''),
      }
    );
  
    this.loadData(1);
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
        .DanhSachHocPhan(data)
         //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.hocphans = model.data;
            this.totalRecords = model.totalItems;
            this.checkSearch = false;
            //  this.spinner.hide();
          },

        });
    }, 300);
  }
  onSearch(): void {
    this.checkSearch = true;
    this.loadData(1);
  }
  // DsHocPhan() {
  //   this.spinner.show();
  //   this.quanlythongtinService.getAll().subscribe(data => {
  //     this.hocphans = data;
     
  //     console.log(this.hocphans);
     
  //     this.spinner.hide();
  //   });
  // }

  add() {
    //build thành 1 obj
    // var val = {
    //   tenhp: this.formAdd.get('tenhp')?.value,
    //   sotc: this.formAdd.get('sotc')?.value,
    //   hocky: this.formAdd.get('hocky')?.value,
    //   heso: this.formAdd.get('heso')?.value,
    //   tieude: this.formAdd.get('tieude')?.value,
    //   code: this.formAdd.get('code')?.value,
    //   ghichu: this.formAdd.get('ghichu')?.value,
    // };
    this.quanlythongtinService.ThemHocPhan(this.formAdd.value).subscribe((data: any) => {
      alert(data.toString());
      
       setTimeout(() => {
        this.loadData(1);
      }, 1000);
     
    })

  }
  onEdit(mahp: any): void {

    this.quanlythongtinService
      .ChiTietHocPhan(mahp)

      .subscribe({
        next: (loai) => {
          console.log(loai);
          
          this.id_Edit=loai.mahp;
          this.formEdit = this.fb.group(
            {
              mahp: this.fb.control(loai.mahp, [Validators.required]),
              tenhp: this.fb.control(loai.tenhp, [Validators.required]),
              code: this.fb.control(loai.code, [Validators.required]),
              hocky: this.fb.control(loai.hocky, [Validators.required]),
              sotc: this.fb.control(loai.sotc, [Validators.required]),
              tieude: this.fb.control(loai.tieude, [Validators.required]),
              heso: this.fb.control(loai.heso, [Validators.required]),
              ghichu: this.fb.control(loai.ghichu)
            });
        },
      });
  }

  update() {
    this.quanlythongtinService.UpdateHocPhan(this.id_Edit, this.formEdit.value).subscribe((data: any) => {
      alert(data.toString());
      setTimeout(() => {
        this.loadData(1);
      }, 1000);
    })
  }
  closeClick() {
    setTimeout(() => {
      this.loadData(1);
    }, 1000);
    this.clearFormAdd();
  }
  deleteClick(item: any) {
    if (confirm('Bạn có muốn xóa không ??')) {
      this.quanlythongtinService.DeleteHocPhan(item.mahp).subscribe(data => {
        alert(data.toString());
        this.loadData(1);
      });
    }
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  clearFormAdd(){
    this.formAdd.reset();
  }
}
