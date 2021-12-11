import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-gochoctap',
  templateUrl: './gochoctap.component.html',
  styleUrls: ['./gochoctap.component.css']
})
export class GochoctapComponent implements OnInit {
  
  constructor(private readonly trangsinhvienService:TrangsinhvienService, private fb: FormBuilder,  private router: Router,private route: ActivatedRoute,) { }
  lopdays:any;
  sv:any;
  magiangday:any;
  ngOnInit(): void {
    this.sv = JSON.parse(localStorage.getItem('sinhvien')|| '{}');
    this.magiangday =this.route.snapshot.paramMap.get('magiangday');
    this.DSlop(this.sv.masv)
  }
  
  DSlop(masv:any) {
    //this.spinner.show();
    this.trangsinhvienService.gochoctap(masv).subscribe(data => {
      this.lopdays = data;
   //   this.totalLength = data.length;
      console.log(this.lopdays);
     // this.spinner.hide();
    });
  }
}
