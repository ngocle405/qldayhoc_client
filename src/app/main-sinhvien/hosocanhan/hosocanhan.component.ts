import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { TrangsinhvienService } from 'src/app/services/trangsinhvien.service';

@Component({
  selector: 'app-hosocanhan',
  templateUrl: './hosocanhan.component.html',
  styleUrls: ['./hosocanhan.component.css']
})
export class HosocanhanComponent implements OnInit {

  constructor(private route: ActivatedRoute,private trangsinhvienService: TrangsinhvienService, private router: Router) { }
  id_edit:any;
  sv: any;
  masv: any;
  tensv: any;
  diachinha: any;
  email: any;
  tentruongdh: any;
  namnhaphoc: any;
  dienthoai: any;
  gioitinh: any;
  ngaysinh: any;
  anhdaidien: any;
  cmnd: any;
  tongiao: any;
  dantoc: any;
  quoctich: any;
  hedaotao: any;
  nienkhoa: any;
  chuyennganh: any;
  nganhhoc: any;
  PhotoFilePath: any;
  malop: any;
  matkhau: any;
  ngOnInit(): void {
    this.sv = JSON.parse(localStorage.getItem('sinhvien') || '{}');
    this.masv = this.route.snapshot.paramMap.get('masv');
   
    this.id_edit=this.sv.masv;
    this.ChitietSinhvien(this.masv)
   
  }
  ctsinhvien:any;
  ChitietSinhvien(masv: any){
    this.trangsinhvienService.ChiTietSinhVien(masv).subscribe(res=>{
      this.ctsinhvien=res;
    })
      
  }
  onEdit(masv: any): void {

    this.trangsinhvienService
      .ChiTietSinhVien(masv)

      .subscribe({
        next: (loai) => {
          //console.log(supplier);
          this.masv = loai.masv;
          this.tensv = loai.tensv;
          console.log(loai);
          this.namnhaphoc = loai.namnhaphoc;
          this.tentruongdh = loai.tentruongdh;
          this.ngaysinh = loai.ngaysinh;
          this.diachinha = loai.diachinha;
          this.dienthoai = loai.dienthoai;
          this.email = loai.email;
          this.anhdaidien = loai.anhdaidien;
          this.cmnd = loai.cmnd;
          this.hedaotao = loai.hedaotao;
          this.chuyennganh = loai.chuyennganh;
          this.nienkhoa = loai.nienkhoa;
          this.namnhaphoc = loai.namnhaphoc;
          this.nganhhoc = loai.nganhhoc,
            this.gioitinh = loai.gioitinh,
            this.quoctich = loai.quoctich,
            this.dantoc = loai.dantoc,
            this.tongiao = loai.tongiao,
            this.matkhau = loai.matkhau,
            this.malop = loai.malop
        },

      });
  }

  UpdateHoSoCaNhan() {
    var val = {
      masv: this.sv.masv,
      tensv: this.tensv,
      diachinha: this.diachinha,
      email: this.email,
      tentruongdh: this.tentruongdh,
      namnhaphoc: this.namnhaphoc,
      dienthoai: this.dienthoai,
      gioitinh: this.gioitinh,
      ngaysinh: this.ngaysinh,
      anhdaidien: this.anhdaidien,
      cmnd: this.cmnd,
      dantoc: this.dantoc,
      tongiao: this.tongiao,
      nganhhoc: this.nganhhoc,
      quoctich: this.quoctich,
      hedaotao: this.hedaotao,
      chuyennganh: this.chuyennganh,
      nienkhoa: this.nienkhoa,
      matkhau:this.matkhau,
      malop:this.malop
    }
    this.trangsinhvienService.UpdateHoSoCaNhan(this.id_edit,val).subscribe(res => {
      // localStorage.setItem('user', JSON.stringify(this.user));
      alert("Đã sửa thông tin cá nhân");
     
      this.ChitietSinhvien(this.masv);
     
      // setTimeout(() => {
      //   this.logout();
      // }, 5000);
      
      
    });
  }
  public uploadPhoto(event: any) {
    var file = event.target.files[0];
    console.log(file)
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.trangsinhvienService.UploadPhotos(formData).subscribe((data: any) => {
      this.anhdaidien = data.toString();
      this.PhotoFilePath = this.trangsinhvienService.PhotoUrl+"/sinhvien" + this.anhdaidien;
    })
  }
  logout() {
    this.trangsinhvienService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('/sinhvien/login');
    }, 1000);
  }

}
