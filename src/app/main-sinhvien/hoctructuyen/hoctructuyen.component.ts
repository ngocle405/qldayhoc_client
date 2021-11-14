import { Component, OnInit } from '@angular/core';
import { GiangdayService } from 'src/app/services/giangday.service';

@Component({
  selector: 'app-hoctructuyen',
  templateUrl: './hoctructuyen.component.html',
  styleUrls: ['./hoctructuyen.component.css']
})
export class HoctructuyenComponent implements OnInit {

  constructor(private giangdayService:GiangdayService) { }
  loptructuyens:any=[];
  checkSearch:boolean=false;
  pageSize = 5;
  page: any = 1;
  txtSearchName: any = '';
  sortByName: any = "";
  totalRecords:any;
  ngOnInit(): void {
    //this.DsLoptructuyen();
    this.loadData(1);
  }
  DsLoptructuyen() {
    //this.spinner.show();
    this.giangdayService.getAll().subscribe(data => {
      this.loptructuyens = data;
     // this.totalLength = data.length;
      console.log(this.loptructuyens);
      
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
      this.giangdayService
        .pagination(data)
         //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.loptructuyens = model.data;
            this.totalRecords = model.totalItems;
            this.checkSearch = false;
              //this.spinner.hide();
          },

        });
    }, 300);
  }
  onSearch(): void {
    this.checkSearch = true;
    this.loadData(1);
  }
}
