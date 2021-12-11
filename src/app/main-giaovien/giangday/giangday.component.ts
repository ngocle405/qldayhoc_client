import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { TranggiaovienService } from 'src/app/services/tranggiaovien.service';
@Component({
  selector: 'app-giangday',
  templateUrl: './giangday.component.html',
  styleUrls: ['./giangday.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class GiangdayComponent implements OnInit {

  constructor( private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router,
    private tranggiaovienService:TranggiaovienService,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
 
  ) { }

  xemlops: any = [];
  baitaps: any = [];
  thaoluans: any = [];
  //form
  formAddBaiGiang !: FormGroup;

  formAddThaoluan !: FormGroup;
  formLayIdSinhVien !: FormGroup;
  formEdit !: FormGroup;
  //

  baigiangs: any = [];
  tailieus: any = [];
  teacher: any;
  PhotoFilePath: any;
  tentailieu: any;
  filename: any;
  filelink: any;
  tenbt: any;
  mota: any;
  malop: any;
  id_Edit: any;
  magiangday: any;
  //
  sinhvien_chuacotronglop: any;
  sinhvien_duocthemvaolop: any;
  //
      //phân trang
      checkSearch: boolean = false;
      pageSize = 7;
      page: any = 1;
      txtSearchName: any = '';
      sortByName: any;
      totalRecords: any;
      sortByCreatedDate:any;

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teacher') || '{}');
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

    this.formLayIdSinhVien = this.fb.group({
      masv: this.fb.control('', Validators.required),
      magiangday: this.fb.control(JSON.parse(this.magiangday), [Validators.required]),
      magv: this.fb.control(this.teacher.magv, [Validators.required]),
    });

    this.XemChiTietLopGiangDay(this.magiangday);
    this.DanhSachBaiGiang(this.magiangday);
    this.DanhSachTaiLieu(this.magiangday);
    this.DanhSachBaiTap(this.magiangday);
    this.DanhSachThaoluan(this.magiangday);
    this.Sinhvienduocthemvaolop(this.magiangday);
    this.Sinhvienchuacotronglop(1);
  }
  
  Sinhvienduocthemvaolop(id: any) {
    this.tranggiaovienService.Sinhvienduocthemvaolop(id).subscribe((data: any) => {
      this.sinhvien_duocthemvaolop = data;//lay du lieu 
      //console.log(data);
    });
  }
  //lấy id sinh viên
  onEdit(masv: any): void {

    this.tranggiaovienService
      .ChiTietSinhVien(masv)

      .subscribe({
        next: (loai) => {
          this.id_Edit = loai.masv;
          // console.log(loai);
          this.formLayIdSinhVien = this.fb.group({
            masv: this.fb.control(loai.masv, [Validators.required]),
            magiangday: this.fb.control(JSON.parse(this.magiangday), [Validators.required]),
            magv: this.fb.control(this.teacher.magv, [Validators.required]),
          });
        },
      });

  }
  //thêm sv
  ThemSinhVienVaoLop() {
    this.tranggiaovienService.ThemSinhVienVaoLop(this.formLayIdSinhVien.value).subscribe((data: any) => {
      alert(data.toString());
      this.Sinhvienduocthemvaolop(this.magiangday);
      // this.clearFormAddBaigiang();
    })
  }
 //sinh viên chưa có trong lớp
 
  Sinhvienchuacotronglop(page:any) {
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
      this.tranggiaovienService
        .Sinhvienchuacotronglop(data)
        //.pipe(first())
        .subscribe({
          next: (model: any) => {
            this.sinhvien_chuacotronglop = model.data;
            this.totalRecords = model.totalItems;
            this.checkSearch = false;
           // this.spinner.hide();
          },

        });
    }, 300);
  
  }
  onSearch(): void {
    this.checkSearch = true;
    this.Sinhvienchuacotronglop(1);
  }
  //từ trang chủ danh sách lớp giảng dạy của giáo viên đó ấn chi tiết 1 lớp
  XemChiTietLopGiangDay(id: any) {
    this.tranggiaovienService.XemChiTietLopGiangDay(id).subscribe(res => {
      // console.log(res);
      this.xemlops=res;

    })
  }
  DanhSachTaiLieu(id: any) {
    this.tranggiaovienService.DanhSachTaiLieu(id).subscribe((data: any) => {
      this.tailieus = data;//lay du lieu 
      //  console.log(data);
    });
  }
  // bai giang
  DanhSachBaiGiang(id: any) {
    this.tranggiaovienService.DanhSachBaiGiang(id).subscribe((data: any) => {
      this.baigiangs = data;//lay du lieu 
      //  console.log(data)
    });
  }
  addBaigiang() {
   
    this.tranggiaovienService.ThemBaigiang(this.formAddBaiGiang.value).subscribe((data: any) => {
      //alert(data.toString());
      this.messageService.add({severity:'success', summary:'Thông báo', detail:'Đã thêm thành công.'});
      this.DanhSachBaiGiang(this.magiangday);
      this.clearFormAddBaigiang();
    })
  }
  //
  closeClick() {

  }

  //tài liệu
  addTailieu() {
    var val = {
      magiangday: JSON.parse(this.magiangday),
      nguoitao: this.teacher.tengv,
      filename: this.filename,
      filelink: this.filelink,
      tentailieu: this.tentailieu,
      mota: this.mota
    }

    this.tranggiaovienService.ThemTaiLieu(val).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Thông báo', detail:'Đã thêm thành công.'});
      this.DanhSachTaiLieu(this.magiangday);
    })
  }

  public UploadTaiLieu(event: any) {
    var file = event.target.files[0];

    console.log(file)
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.tranggiaovienService.UploadTaiLieu(formData).subscribe((data: any) => {
      this.filename = data.toString();
      this.PhotoFilePath = this.tranggiaovienService.PhotoUrl+"/Tailieu/" + this.filename;//ĐƯỜNG LINK ĐẾN API
    })
  }
  //
  // bài tập
  DanhSachBaiTap(id: any) {
    this.tranggiaovienService.DanhSachBaiTap(id).subscribe((data: any) => {
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
    this.tranggiaovienService.UploadBaiTap(formData).subscribe((data: any) => {
      this.filename = data.toString();
      this.PhotoFilePath = this.tranggiaovienService.PhotoUrl+"/Baitap/" + this.filename;
    })
  }
  addBaitap() {
    var val = {
      magiangday: JSON.parse(this.magiangday),
      nguoitao: this.teacher.tengv,
      filename: this.filename,
      tenbt: this.tenbt,
      filelink: this.filelink,
    }
    this.tranggiaovienService.ThemBaiTap(val).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Thông báo', detail:'Đã thêm thành công.'});
      this.DanhSachBaiTap(this.magiangday);
      this.tenbt = "";

      this.filename = "";

    })
  }
  //
  // thao luan
  DanhSachThaoluan(id: any) {
    this.tranggiaovienService.DanhSachThaoluan(id).subscribe((data: any) => {
      this.thaoluans = data;//lay du lieu 
      //   console.log(data);
    });
  }
  addThaoluan() {
    this.tranggiaovienService.ThemThaoluan(this.formAddThaoluan.value).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Thông báo', detail:'Đã thêm thành công.'});
      this.DanhSachThaoluan(this.magiangday);
      this.clearFormAddThaoluan();
    })
  }
  //clear form
  clearFormAddBaigiang() {
    this.formAddBaiGiang.reset();
  }
  clearFormAddThaoluan() {
    this.formAddThaoluan.reset();
  }
  //
  //  xóa 
  deleteBaigiang(item: any) {

    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa bài giảng này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tranggiaovienService.deleteBaigiang(item.mabg).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DanhSachBaiGiang(this.magiangday);
        });
      },

    })
    
  };
  
    

  
  deleteTailieu(item: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa tài liệu này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tranggiaovienService.DeleteTailieu(item.matailieu).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DanhSachTaiLieu(this.magiangday);
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
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tranggiaovienService.DeleteBaitap(item.mabt).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DanhSachBaiTap(this.magiangday);
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
      icon: 'pi pi-exclamation-triangle',
      message: 'Bạn có muốn xóa bài thảo luận này ?',
      accept: () => {
        this.tranggiaovienService.DeleteThaoLuan(item.id).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Đã xóa thành công.' });
          this.DanhSachThaoluan(this.magiangday);
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
