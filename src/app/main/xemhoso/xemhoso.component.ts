import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuanlythongtinService } from 'src/app/services/quanlythongtin.service';


@Component({
  selector: 'app-xemhoso',
  templateUrl: './xemhoso.component.html',
  styleUrls: ['./xemhoso.component.css']
})
export class XemhosoComponent implements OnInit {
  magv: any;
  constructor(private quanlythongtinService: QuanlythongtinService, private route: ActivatedRoute, private spinner: NgxSpinnerService,) { }
  giaoviens: any;
  ngOnInit(): void {
    this.spinner.show();
    this.magv = this.route.snapshot.paramMap.get('magv');
    this.getByID(this.magv);
  }
  getByID(magv: any) {
   
    this.quanlythongtinService.ChiTietGiaoVien(magv).subscribe(data => {
      this.giaoviens = data;
      this.spinner.hide();
    })
  }
}
