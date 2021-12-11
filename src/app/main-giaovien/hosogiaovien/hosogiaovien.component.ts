import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranggiaovienService } from 'src/app/services/tranggiaovien.service';

@Component({
  selector: 'app-hosogiaovien',
  templateUrl: './hosogiaovien.component.html',
  styleUrls: ['./hosogiaovien.component.css']
})
export class HosogiaovienComponent implements OnInit {

  constructor(private tranggiaovienService: TranggiaovienService, private route: ActivatedRoute, private router: Router) { }
  gv: any;
 
  magv: any;
  tengv: any;
  diachi: any;
  email: any;
  ngaytotnghiep: any;
  totnghieptruong: any;
  dienthoai: any;
  soyeulylich: any;
  ngaysinh: any;
  anhdaidien: any;
  cmnd: any;
  tongiao: any;
  dantoc: any;
  quoctich: any;
  chucdanhkythuat: any;
  bangcap: any;
  chuyennganh: any;
  trinhdohocvan: any;
  PhotoFilePath: any;
  matkhau: any;
  //
  id_edit:any;
  ngOnInit(): void {

    this.gv = JSON.parse(localStorage.getItem('teacher') || '{}');
    this.magv = this.route.snapshot.paramMap.get('magv');
    this.id_edit=this.gv.magv;
    this.CtGiaovien(this.magv);//ở dưới

  }
  CtGiaovien(magv: any) {
    this.tranggiaovienService.ChiTietGiaoVien(magv).subscribe(res => {
      this.gv = res;
    })


  }
  onEdit(magv: any): void {

    this.tranggiaovienService
      .ChiTietGiaoVien(magv)

      .subscribe({
        next: (loai) => {
          //console.log(supplier);
          this.magv = loai.magv;
          this.tengv = loai.tengv;
          console.log(loai);
          this.totnghieptruong = loai.totnghieptruong;
          this.ngaytotnghiep = loai.ngaytotnghiep;
          this.ngaysinh = loai.ngaysinh;
          this.diachi = loai.diachi;
          this.dienthoai = loai.dienthoai;
          this.email = loai.email;
          this.anhdaidien = loai.anhdaidien;
          this.cmnd = loai.cmnd;
          this.chucdanhkythuat = loai.chucdanhkythuat;
          this.chuyennganh = loai.chuyennganh;
          this.bangcap = loai.bangcap;
          this.totnghieptruong = loai.totnghieptruong;
          this.trinhdohocvan = loai.trinhdohocvan,
            this.soyeulylich = loai.soyeulylich,
            this.quoctich = loai.quoctich,
            this.dantoc = loai.dantoc,
            this.tongiao = loai.tongiao,
            this.matkhau = loai.matkhau

        },

      });
  }

  update() {
    var val = {
      magv: this.gv.magv,
      tengv: this.tengv,
      diachi: this.diachi,
      email: this.email,
      ngaytotnghiep: this.ngaytotnghiep,
      totnghieptruong: this.totnghieptruong,
      dienthoai: this.dienthoai,
      soyeulylich: this.soyeulylich,
      ngaysinh: this.ngaysinh,
      anhdaidien: this.anhdaidien,
      cmnd: this.cmnd,
      dantoc: this.dantoc,
      tongiao: this.tongiao,
      trinhdohocvan: this.trinhdohocvan,
      quoctich: this.quoctich,
      chucdanhkythuat: this.chucdanhkythuat,
      chuyennganh: this.chuyennganh,
      bangcap: this.bangcap,
      matkhau: this.matkhau

    }
    this.tranggiaovienService.update(this.id_edit,val).subscribe(res => {
      // localStorage.setItem('user', JSON.stringify(this.user));
      alert("Đã sửa thông tin cá nhân,bạn sẽ đăng xuất sau 5s");
      this.CtGiaovien(this.magv);
       setTimeout(() => {
        this.logout();
       }, 5000);
      //
    });
  }
  public uploadPhoto(event: any) {
    var file = event.target.files[0];
    console.log(file)
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.tranggiaovienService.UploadPhotos(formData).subscribe((data: any) => {
      this.anhdaidien = data.toString();
      this.PhotoFilePath = this.tranggiaovienService.PhotoUrl + "giaovien/" + this.anhdaidien;
    })
  }
  logout() {
    this.tranggiaovienService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('/giaovien/login');
    }, 0);
  }

}
