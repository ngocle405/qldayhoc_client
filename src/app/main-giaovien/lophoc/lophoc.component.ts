import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LophocService } from 'src/app/services/lophoc.service';

@Component({
  selector: 'app-lophoc',
  templateUrl: './lophoc.component.html',
  styleUrls: ['./lophoc.component.css']
})
export class LophocComponent implements OnInit {

  constructor(private readonly lophocService:LophocService, private fb: FormBuilder,  private router: Router,) { }
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
      namhoc: this.fb.control("2020 - 2021", [Validators.required]),
      ghichu: this.fb.control('', [Validators.required]),
      tiethoc: this.fb.control('', [Validators.required]),
    });
   
    this.DsLop(this.teacher.magv);
    this.DsLophoc();
    this.DsHocphan();
  }
  DsLop(magv:any) {
    //this.spinner.show();
    this.lophocService.getLopday(magv).subscribe(data => {
    
      this.lopdays = data;
   //   this.totalLength = data.length;
      console.log(this.lopdays);
     // this.spinner.hide();
    });
  }
  DsLophoc(){
    this.lophocService.getLophoc().subscribe((data: any) => {
      this.lophocs = data;//lay du lieu 
      this.malop;
    });
  }
  DsHocphan(){
    this.lophocService.getHocphan().subscribe((data: any) => {
      this.hocphans = data;//lay du lieu 
      this.mahp;
    });
  }
  deleteClick(item: any) {
    this.lophocService.deleteLopday(item.magiangday).subscribe(data => {
      
      this.DsLop(this.teacher.magv);
      
    });

  }
  addLophoc() {
    this.lophocService.addLopday(this.formAdd.value).subscribe((data: any) => {
      alert(data.toString());
      setTimeout(() => {
        this.router.navigateByUrl('/giaovien/lophoc');
      }, 1000);
      location.reload();
    })
  }
  closeClick(){
  }
 
}
