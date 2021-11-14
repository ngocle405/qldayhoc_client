import { Component, OnInit } from '@angular/core';
import { HocphanService } from 'src/app/services/hocphan.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hocphan',
  templateUrl: './hocphan.component.html',
  styleUrls: ['./hocphan.component.css'],
  providers: [MessageService, ConfirmDialogModule, ConfirmationService]
})
export class HocphanComponent implements OnInit {
  formAdd !: FormGroup ;


  //phân trang
  
  
  //
 
  hocphans: any = [];
  mahp: any;
  hocky: any;
  sotc: any;
 
  heso: any;
  tieude: any;
  code: any;
  tenhp: any;

  ghichu: any;
  checkSearch:boolean=false;
  pageSize = 5;
  page: any = 1;
  txtSearchName: any = '';
  sortByName: any = "chọn";
  totalRecords:any;
  //
  searchText: any;
  constructor(private hocphanService: HocphanService,
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
      this.hocphanService
        .pagination(data)
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
  DsHocPhan() {
    this.spinner.show();
    this.hocphanService.getAll().subscribe(data => {
      this.hocphans = data;
     
      console.log(this.hocphans);
     
      this.spinner.hide();
    });
  }

  add() {
    var val = {
      tenhp: this.formAdd.get('tenhp')?.value,
      sotc: this.formAdd.get('sotc')?.value,
      hocky: this.formAdd.get('hocky')?.value,
      heso: this.formAdd.get('heso')?.value,
      tieude: this.formAdd.get('tieude')?.value,
      code: this.formAdd.get('code')?.value,
      ghichu: this.formAdd.get('ghichu')?.value,
    };
    this.hocphanService.add(val).subscribe((data: any) => {
      alert(data.toString());
      
       setTimeout(() => {
        this.router.navigateByUrl('/hocphan');
      }, 1000);
      location.reload();
    })

  }
  onEdit(mahp: any): void {

    this.hocphanService
      .getByid(mahp)

      .subscribe({
        next: (loai) => {
          //console.log(supplier);
          this.mahp = loai.mahp;
          this.tenhp = loai.tenhp;
          this.hocky = loai.hocky;
          this.heso = loai.heso;
          this.tieude = loai.tieude;
          this.sotc = loai.sotc;
          this.code = loai.code;
          this.ghichu = loai.ghichu;
        },
      });
  }

  update(){
    var val = {
      mahp:this.mahp,
      tenhp: this.tenhp,
      sotc: this.sotc,
      hocky: this.hocky,
      // sotclythuyet: this.sotclythuyet,
      // sotcthuchanh: this.sotcthuchanh,
      heso: this.heso,
      tieude: this.tieude,
      code: this.code,
      ghichu: this.ghichu,
    };
    this.hocphanService.update(val).subscribe((data: any) => {
      alert(data.toString());
      location.reload();
       setTimeout(() => {
        this.router.navigateByUrl('/hocphan');
      }, 1000);
    })
  }
  closeClick() {
    setTimeout(() => {
      this.router.navigateByUrl('/hocphan');
    }, 1000);
    this.clearFormAdd();
  }
  deleteClick(item: any) {
    if (confirm('Bạn có muốn xóa không ??')) {
      this.hocphanService.delete(item.mahp).subscribe(data => {
        alert(data.toString());
        this.DsHocPhan();
      });
    }
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  clearFormAdd(){
    this.formAdd.reset;
  }
}
