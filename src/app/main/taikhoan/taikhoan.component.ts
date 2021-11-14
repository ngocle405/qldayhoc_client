import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiaovienService } from 'src/app/services/giaovien.service';



@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.css']
})
export class TaikhoanComponent implements OnInit {

  user: any ;
  constructor(private router: Router, private giaovienService:GiaovienService) { }
  magv: any;
  tengv: any;
  totnghieptruong: any;
  ngaytotnghiep: any;
  chucdanhkythuat: any;
  bangcap: any;
  trinhdohocvan: any;
  dienthoai: any;
  email: any;
  soyeulylich: any;
  diachi: any;
  matkhau: any;
  anhdaidien: any;
  ngaysinh: any;
  dantoc: any;
  tongiao: any;
  cmnd: any;
  kynang: any;
  status: any;
  //
  PhotoFilePath: any;


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") || "");
    this.magv = this.user.magv,
      this.tengv = this.user.tengv,
      this.diachi = this.user.diachi,
      this.email = this.user.email,
      this.dienthoai = this.user.dienthoai,
      this.matkhau = this.user.matkhau,
      this.totnghieptruong = this.user.totnghieptruong,
      this.ngaytotnghiep = this.user.ngaytotnghiep,
      this.anhdaidien = this.user.anhdaidien
      this.chucdanhkythuat = this.user.chucdanhkythuat,
      this.bangcap = this.user.bangcap,
      this.trinhdohocvan = this.user.trinhdohocvan,
      this.soyeulylich = this.user.soyeulylich,
      this.ngaysinh = this.user.ngaysinh,
      this.dantoc = this.user.dantoc,
      this.tongiao = this.user.tongiao,
      this.cmnd = this.user.cmnd,
      this.status = this.user.status,
      this.kynang = this.user.kynang
  }

  update() {
    var val = {
      magv: this.user.magv,
      tengv: this.tengv,
      diachi: this.diachi,
      email: this.email,
      totnghieptruong: this.totnghieptruong,
      matkhau: this.matkhau,
      dienthoai: this.dienthoai,
      ngaytotnghiep: this.ngaytotnghiep,
      chucdanhkythuat: this.chucdanhkythuat,
      anhdaidien: this.anhdaidien,
      bangcap: this.bangcap,
      trinhdohocvan: this.trinhdohocvan,
      soyeulylich: this.soyeulylich,
      ngaysinh: this.ngaysinh,
      dantoc: this.dantoc,
      tongiao: this.tongiao,
      cmnd: this.cmnd,
      status: this.status,
      kynang: this.kynang,

    }
    this.giaovienService.update(val).subscribe(res => {
      localStorage.setItem('user', JSON.stringify(this.user));
      alert("Đã sửa thông tin cá nhân,yêu cầu bạn đăng nhập lại");
      console.log(res);
      this.logout();
    });
  }
  public uploadPhoto(event: any) {
    var file = event.target.files[0];
    console.log(file)
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData)
    this.giaovienService.UploadPhoto(formData).subscribe((data: any) => {
      this.anhdaidien = data.toString();
      this.PhotoFilePath = this.giaovienService.PhotoUrl + this.anhdaidien;
    })
  }
  logout() {
    this.giaovienService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 1000);
  }

}
