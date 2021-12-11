import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class QuanlythongtinService {
  private APIUrl = 'http://localhost:44169/api/QuanLyThongTins';
  constructor(private readonly http: HttpClient) { }
  
  //#region  quản lý học phần 
  /** 
   * CreateBy:Lê thanh ngọc (27/11/2021)
   * QUẢN LÝ HỌC PHẦN GỒM :
   * 1.Danh sách học phần (pagination,tìm kiếm)
   * 2.Chi tiết học phần
   * 3.Thêm học phần
   * 4.Update Học phần
   * 5.Xóa học phần
   */
  DanhSachHocPhan(data: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachHocPhan`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  ChiTietHocPhan(mahp: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietHocPhan/${mahp}`;
    return this.http.get<any>(url);
  }
  ThemHocPhan(hp: any) {
    return this.http.post(this.APIUrl + '/ThemHocPhan/', hp);
  }
  UpdateHocPhan(mahp: any, hocphan: any): Observable<number> {
    const url = `${this.APIUrl}/UpdateHocPhan/${mahp}`;
    var body = JSON.stringify(hocphan);
    return this.http.put<any>(url, body, httpOptions);
  }
  DeleteHocPhan(mahp: any) {
    return this.http.delete(this.APIUrl + '/DeleteHocPhan/' + mahp);
  }
  //#endregion



  //#region Quản lý giáo viên

  // UploadPhoto(val: any) {
  //   return this.http.post(this.APIUrl + '/giaoviens/SaveFile', val);
  // }
  /** 
     * CreateBy:Lê thanh ngọc (27/11/2021)
     * QUẢN LÝ GIÁO VIÊN GỒM :
     * 1.Danh sách giáo viên (pagination,tìm kiếm)
     * 2.Chi tiết giáo viên
     * 3.Thêm giáo viên
     * 4.Xóa  giáo viên
     */
  DanhSachGiaoVien(data: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachGiaoVien`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  ThemGiaoVien(val: any) {
    return this.http.post(this.APIUrl + '/ThemGiaoVien/', val);
  }
  DeleteGiaoVien(val: any) {
    return this.http.delete(this.APIUrl + '/DeleteGiaoVien/' + val);
  }
  ChiTietGiaoVien(magv: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietGiaoVien/${magv}`;
    return this.http.get<any>(url);
  }
  //#endregion

  //#region QUẢN LÝ LỚP
  /**
    * CreateBy:Lê thanh ngọc (27/11/2021)
    * QUẢN LÝ LỚP GỒM :
    * 1.Danh sách lớp (pagination,tìm kiếm)
    * 2.Chi tiết lớp
    * 3.Thêmlớp
    * 4.Sửa lớp
    * 4.Xóa lớp
    */
  DanhSachLop(data: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachLop`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  ChiTietLop(malop: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietLop/${malop}`;
    return this.http.get<any>(url);
  }
  // add(hp:any){
  //   return this.http.post(this.APIUrl+'/lophocs/',hp);
  // }
  ThemLop(lophoc: any): Observable<number> {
    const url = `${this.APIUrl}/ThemLop`;
    var body = JSON.stringify(lophoc);
    return this.http.post<any>(url, body, httpOptions);
  }
  // update(hp:any){
  //   return this.http.put(this.APIUrl+'/lophocs/',hp);
  // }

  DeleteLop(malop: any) {
    return this.http.delete(this.APIUrl + '/DeleteLop/' + malop);
  }
  UpdateLop(malop: any, lophoc: any): Observable<number> {
    const url = `${this.APIUrl}/UpdateLop/${malop}`;
    var body = JSON.stringify(lophoc);
    return this.http.put<any>(url, body, httpOptions);
  }
  //#endregion

  //#region QUẢN LÝ SINH VIÊN
  /**
    * CreateBy:Lê thanh ngọc (27/11/2021)
    * QUẢN LÝ SINH VIÊN GỒM :
    * 1.Danh sách sinh viên (pagination,tìm kiếm)
    * 2.Chi tiết sinh viên
    * 3.Thêm sinh viên
    * 4.Xóa sinh viên
    */
  DanhSachSinhVien(data: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachSinhVien`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  ChiTietSinhVien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietSinhVien/${masv}`;
    return this.http.get<any>(url);
  }

  ThemSinhVien(sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/ThemSinhVien`;
    var body = JSON.stringify(sinhvien);
    return this.http.post<any>(url, body, httpOptions);
  }

  DeleteSinhvien(masv: any) {
    return this.http.delete(this.APIUrl + '/DeleteSinhvien/' + masv);
  }
  UpdateSinhVien(masv: any, sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/UpdateSinhVien/${masv}`;
    var body = JSON.stringify(sinhvien);
    return this.http.put<any>(url, body, httpOptions);
  }

  //#endregion

  //#region QUẢN LÝ TÀI LIỆU
  DanhSachTaiLieu(data: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachTaiLieu`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  DeleteTailieu(mafile:any){
    return this.http.delete(this.APIUrl+'/DeleteTailieu/'+mafile);
  }
  //#endregion

  //#region LOAD LỚP
  getLophoc():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/GetLophoc');
  }
  //#endregion
}
