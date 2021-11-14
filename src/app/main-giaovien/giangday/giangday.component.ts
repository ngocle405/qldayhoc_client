import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaitapService } from 'src/app/services/baitap.service';
import { GiangdayService } from 'src/app/services/giangday.service';
import { LophocService } from 'src/app/services/lophoc.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { SinhvienService } from 'src/app/services/sinhvien.service';
@Component({
  selector: 'app-giangday',
  templateUrl: './giangday.component.html',
  styleUrls: ['./giangday.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class GiangdayComponent implements OnInit {

  constructor(private lophocService:LophocService,private route: ActivatedRoute,private fb: FormBuilder,
      private router: Router,private baitapService:BaitapService,
     private giangdayService :GiangdayService,
     private readonly messageService: MessageService,
     private confirmationService: ConfirmationService,
     private sinhvienService:SinhvienService
      ) { }
  
  xemlops:any=[];
  baitaps:any=[];
  thaoluans:any=[];
  //form
  formAddBaiGiang !:FormGroup;
  
  formAddThaoluan !:FormGroup;
  formAddsv !:FormGroup;
  formEdit !:FormGroup;
  //
 
  baigiangs:any=[];
  tailieus:any=[];
  teacher:any;
  PhotoFilePath:any;
  tentailieu:any;
  filename:any;
  filelink:any;
  tenbt:any;
  mota:any;
  malop:any;
  id_Edit:any;
  magiangday:any;
  loadsvlop:any;
  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher')|| '{}');
    this.magiangday = this.route.snapshot.paramMap.get('magiangday');
  
    
    this.formAddBaiGiang = this.fb.group({
      magiangday: this.fb.control(JSON.parse(this.magiangday), [Validators.required]),
      noidung: this.fb.control('', [Validators.required]),
      sotiet: this.fb.control('', [Validators.required]),
      filelink: this.fb.control(''),
      tieude: this.fb.control('', [Validators.required]),
      nguoitao: this.fb.control(this.teacher.tengv, [Validators.required]),
    });
    //
    this.formAddThaoluan = this.fb.group({
      magiangday: this.fb.control(JSON.parse(this.magiangday), [Validators.required]),
      noidung: this.fb.control('', [Validators.required]),
      tieude: this.fb.control('', [Validators.required]),
      nguoitao: this.fb.control(this.teacher.tengv, [Validators.required]),
    });
  //
  
    this.formEdit = this.fb.group({
      masv: this.fb.control('',Validators.required),
      magiangday: this.fb.control(JSON.parse(this.magiangday), []),
      magv: this.fb.control(this.teacher.magv, [Validators.required]),
    });
  
    this.xemlop(this.magiangday);
    this.Dsbaigiang(this.magiangday);
    this.DsTailieu(this.magiangday);
    this.Dsbaitap(this.magiangday);
    this.Dsthaoluan(this.magiangday);
    this.dssv(this.magiangday);
    this.loadsv();
  }
  sv:any=[];
  dssv(id:any){
    this.giangdayService.dssv(id).subscribe((data: any) => {
      this.sv = data;//lay du lieu 
      //console.log(data);
    });
  }
  onEdit(masv: any): void {

    this.sinhvienService
      .getByid(masv)

      .subscribe({
        next: (loai) => {
          this.id_Edit = loai.masv;
         // console.log(loai);
          this.formEdit = this.fb.group({
            masv: this.fb.control(loai.masv, [Validators.required]),
            magiangday: this.fb.control(JSON.parse(this.magiangday), [Validators.required]),
            magv: this.fb.control(this.teacher.magv, [Validators.required]),
          });
        },
      });
       
  }
  addsv() {
    this.giangdayService.addsv(this.formEdit.value).subscribe((data: any) => {
      alert(data.toString());
      this.dssv(this.magiangday);
      // this.clearFormAddBaigiang();
    })
  }
  
  loadsv(){
    this.giangdayService.loadsv().subscribe((data: any) => {
      this.loadsvlop = data;//lay du lieu 
    //  console.log(data);
    });
  }
  xemlop(id: any) {
    this.lophocService.xemlop(id).subscribe(res => {
      this.xemlops = res;
     // console.log(res);
     
    })
  }
  DsTailieu(id:any){
    this.lophocService.tailieu(id).subscribe((data: any) => {
      this.tailieus = data;//lay du lieu 
    //  console.log(data);
    });
  }
  // bai giang
  Dsbaigiang(id:any){
    this.giangdayService.dsbaigiang(id).subscribe((data: any) => {
      this.baigiangs = data;//lay du lieu 
    //  console.log(data)
    });
  }
  addBaigiang() {
    this.giangdayService.addBaigiang(this.formAddBaiGiang.value).subscribe((data: any) => {
      alert(data.toString());
      this.Dsbaigiang(this.magiangday);
      this.clearFormAddBaigiang();
    })
  }
  //
  closeClick(){

  }

 //tài liệu
  addTailieu() {
    var val={
          magiangday:JSON.parse(this.magiangday),
          nguoitao:this.teacher.tengv,
          filename:this.filename,
          filelink:this.filelink,
          tentailieu:this.tentailieu,
          mota:this.mota
    }
   
    this.lophocService.addtailieu(val).subscribe((data: any) => {
      alert(data.toString());
      
    })
  }

  public uploadFile(event: any) {
    var file = event.target.files[0];
  
    console.log(file)
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.lophocService.UploadFile(formData).subscribe((data: any) => {
      this.filename = data.toString();
      this.PhotoFilePath = this.lophocService.PhotoUrl + this.filename;
    })
  }
  //
  // bài tập
  Dsbaitap(id:any){
    this.baitapService.dsbaitap(id).subscribe((data: any) => {
      this.baitaps = data;//lay du lieu 
      console.log(data)
    });
  }
  //upload bài tập
  public uploadBaitap(event: any) {
    var file = event.target.files[0];
    
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.baitapService.UploadBaitap(formData).subscribe((data: any) => {
      this.filename = data.toString();
      this.PhotoFilePath = this.baitapService.PhotoUrl + this.filename;
    })
  }
  addBaitap() {
    var val={
          magiangday:JSON.parse(this.magiangday),
          nguoitao:this.teacher.tengv,
          filename:this.filename,
          tenbt:this.tenbt,
          filelink:this.filelink,
    }
    this.baitapService.addBaitap(val).subscribe((data: any) => {
      alert(data.toString());
      this.Dsbaitap(this.magiangday);
      this.tenbt="";
      
      this.filename="";
      
    })
  }
   //
  // thao luan
  Dsthaoluan(id:any){
    this.giangdayService.dsthaoluan(id).subscribe((data: any) => {
      this.thaoluans = data;//lay du lieu 
   //   console.log(data);
    });
  }
  addThaoluan() {
    this.giangdayService.addThaoluan(this.formAddThaoluan.value).subscribe((data: any) => {
      alert(data.toString());
      this.Dsthaoluan(this.magiangday);
      this.clearFormAddThaoluan();
    })
  }
  //clear form
  clearFormAddBaigiang(){
    this.formAddBaiGiang.reset();
  }
  clearFormAddThaoluan(){
    this.formAddThaoluan.reset();
  }
  //
  //  xóa 
  deleteBaigiang(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa bài giảng này ?',
      accept: () => {
        this.giangdayService.deleteBaigiang(item.mabg).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.Dsbaigiang(this.magiangday);
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
  deleteTailieu(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa tài liệu này ?',
      accept: () => {
        this.giangdayService.deleteTailieu(item.matailieu).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DsTailieu(this.magiangday);
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
  deleteBaitap(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa bài tập này ?',
      accept: () => {
        this.giangdayService.deleteBaitap(item.mabt).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.Dsbaitap(this.magiangday);
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
  deleteThaoluan(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa bài thảo luận này ?',
      accept: () => {
        this.giangdayService.deleteThaoluan(item.id).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.Dsthaoluan(this.magiangday);
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
  //
}
