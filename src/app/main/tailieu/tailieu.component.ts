import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { QuanlythongtinService } from 'src/app/services/quanlythongtin.service';


@Component({
  selector: 'app-tailieu',
  templateUrl: './tailieu.component.html',
  styleUrls: ['./tailieu.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class TailieuComponent implements OnInit {

  constructor(private quanlythongtinService:QuanlythongtinService, private spinner: NgxSpinnerService,private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  tailieus:any=[];
 //
 checkSearch:boolean=false;
 pageSize = 5;
 page: any = 1;
 txtSearchName: any = '';
 sortByName: any = "";
 totalRecords:any;
 sortByCreatedDate:any;
  ngOnInit(): void {
    this.loadData(1);
  }
  loadData(page: any): void {
     this.spinner.show();
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
        .DanhSachTaiLieu(data)
         //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.tailieus = model.data;
            this.totalRecords = model.totalItems;
            this.checkSearch = false;
              this.spinner.hide();
          },

        });
    }, 100);
  }
  onSearch(): void {
    this.checkSearch = true;
    this.loadData(1);
  }
  DeleteTailieu(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa tài liệu này ?',
      accept: () => {
        this.quanlythongtinService.DeleteTailieu(item.matailieu).subscribe(data => {
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

}
