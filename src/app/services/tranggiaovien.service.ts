import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class TranggiaovienService {

  readonly APIUrl = "http://localhost:44169/api/TrangGiaoViens";
  readonly PhotoUrl = "http://localhost:44169/Photos/";

  constructor(private http: HttpClient) { }

  //#region ĐĂNG NHẬP VÀ ĐĂNG XUẤT GIÁO VIÊN
  private userLogin = new BehaviorSubject({});
  public user$ = this.userLogin.asObservable();

  public get userValue(): any {
    return this.userLogin.value;
  }
  login(login: any): Observable<any> {
    const url = `${this.APIUrl}/login`;
    var log = JSON.stringify(login);
    return this.http.post<any>(url, log, httpOptions).pipe(
      map((user) => {
        //debugger;
        localStorage.setItem('teacher', JSON.stringify(user));
        this.userLogin.next(user);
        return user;
      })
    );
  }
  logout() {
    localStorage.removeItem('teacher');
    this.userLogin.next(null!);
  }

  //#endregion

  //#region lấy id giáo viên và upload ảnh ,update sv
  ChiTietGiaoVien(magv: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietGiaoVien/${magv}`;
    return this.http.get<any>(url);
  }
  update(MAGV: any, GIAOVIEN: any): Observable<number> {
    const url = `${this.APIUrl}/UpdateGiaovien/${MAGV}`;
    var body = JSON.stringify(GIAOVIEN);
    return this.http.put<any>(url, body, httpOptions);
  }
 
  
  UploadPhotos(val: any) {
    return this.http.post(this.APIUrl + '/UploadPhotos', val);
  }

  //#endregion

  //#region lớp giảng dạy trực tuyến ,giáo viên thao tác
  /**
  * lớp giảng dạy trực tuyến 
  * giáo viên thao tác
  * @param malop 
  * @returns danh sách các lớp dạy
  */
  DanhSachLopGiangDayTrucTuyen(malop: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachLopGiangDayTrucTuyen/${malop}`;
    return this.http.get<any>(url);
  }
  DeleteLopGiangDayTrucTuyen(malop: any) {
    return this.http.delete(this.APIUrl + '/DeleteGiangday/' + malop);
  }
  ThemlopGiangDay(lophoc: any): Observable<number> {
    const url = `${this.APIUrl}/ThemlopGiangDay`;
    var body = JSON.stringify(lophoc);
    return this.http.post<any>(url, body, httpOptions);
  }
  //load lớp học vs học phần
  getLophoc(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/GetLophoc');
  }
  getHocphan(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/getHocphan');
  }

  //#endregion

  //#region xem chi tiết lớp giảng dạy(truy cập)
  //xem chi tiết lớp giảng dạy
  XemChiTietLopGiangDay(malop: any): Observable<any> {
    const url = `${this.APIUrl}/XemChiTietLopGiangDay/${malop}`;
    return this.http.get<any>(url);
  }
  //#endregion

  //khi đã truy cập vào lớp giảng dạy,Thực hiện các thao tác với bài giảng,tài liệu,bài tập,thảo luận
  //#region  Thao tác với bài giảng (hiển thị,THÊM,XÓA)

  DanhSachBaiGiang(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachBaiGiang/${mabg}`;
    return this.http.get<any>(url);
  }
  //thêm
  ThemBaigiang(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/ThemBaigiang`;
    var body = JSON.stringify(baigiang);
    return this.http.post<any>(url, body, httpOptions);
  }
  //xóa
  deleteBaigiang(malop: any) {
    return this.http.delete(this.APIUrl + '/deletebaigiang/' + malop);
  }
  //#endregion

  //#region THAO TÁC VỚI TÀI LIỆU (HIỂN THỊ,THÊM XÓA)
  DanhSachTaiLieu(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachTaiLieu/${mabg}`;
    return this.http.get<any>(url);
  }
  ThemTaiLieu(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/ThemTaiLieu`;
    var body = JSON.stringify(baigiang);
    return this.http.post<any>(url, body, httpOptions);
  }
  UploadTaiLieu(val: any) {
    return this.http.post(this.APIUrl + '/UploadTaiLieu', val);
  }
  DeleteTailieu(malop: any) {
    return this.http.delete(this.APIUrl + '/DeleteTailieu/' + malop);
  }
  //#endregion

  //#region THAO TÁC VỚI BÀI TẬP (HIỂN THỊ,THÊM XÓA,NỘP BTAP)
  DanhSachBaiTap(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachBaiTap/${mabg}`;
    return this.http.get<any>(url);
  }

  ThemBaiTap(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/ThemBaiTap`;
    var body = JSON.stringify(baigiang);
    return this.http.post<any>(url, body, httpOptions);
  }
  DeleteBaitap(mafile: any) {
    return this.http.delete(this.APIUrl + '/DeleteBaitap/' + mafile);
  }
  UploadBaiTap(val: any) {
    return this.http.post(this.APIUrl + '/UploadBaiTap', val);
  }


  //#endregion

  //#region  THAO TÁC VỚI THẢO LUẬN (THÊM XÓA,HIỂN THỊ)

  DanhSachThaoluan(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/DanhSachThaoluan/${mabg}`;
    return this.http.get<any>(url);
  }
  ThemThaoluan(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/ThemThaoluan`;
    var body = JSON.stringify(baigiang);
    return this.http.post<any>(url, body, httpOptions);
  }
  DeleteThaoLuan(malop: any) {
    return this.http.delete(this.APIUrl + '/DeleteThaoLuan/' + malop);
  }
  //#endregion

  //#region  THAO TÁC VỚI SINH VIÊN ( HIỂN THỊ CÁC SINH VIÊN TRONG LỚP,SINH VIÊN CHƯA CÓ TRONG LỚP , THÊM SINH VIÊN VÀO LỚP TRỰC TUYẾN )

  //SINH VIÊN ĐÃ ĐƯỢC THÊM VÀO LỚP
  Sinhvienduocthemvaolop(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/Sinhvienduocthemvaolop/${mabg}`;
    return this.http.get<any>(url);
  }

  ThemSinhVienVaoLop(SINHVIEN: any): Observable<number> {
    const url = `${this.APIUrl}/ThemSinhVienVaoLop/`;
    var body = JSON.stringify(SINHVIEN);
    return this.http.post<any>(url, body, httpOptions);
  }
  //SINH VIÊN CHƯA CÓ TRONG LỚP PHỤC VỤ CHO MỤC ĐÍCH THÊM SINH VIÊN
  Sinhvienchuacotronglop(sinhvien:any) {
    const url = `${this.APIUrl}/Sinhvienchuacotronglop`;
    var body = JSON.stringify(sinhvien);
    return this.http.post<any>(url, body, httpOptions);
  
  }
  //#endregion

  //#region chi tiết bài tập giáo viên đã đăng
  //chi tiết bài tập giáo viên đã đăng và danh sách bài tập sinh viên đã nộp có mã bt.
  ChiTietBaiTap(mabt: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietBaiTap/${mabt}`;
    return this.http.get<any>(url);
  }
  // danh sách bài tập sv đã nộp
  BaiTapDaNop(mabt: any): Observable<any> {
    const url = `${this.APIUrl}/BaiTapDaNop/${mabt}`;
    return this.http.get<any>(url);
  }
  //#endregion


  //#region  KHI ẤN VÀO HỌC TRỰC TRUYẾN
  HocTrucTuyen(data: any): Observable<any> {
    const url = `${this.APIUrl}/HocTrucTuyen`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  //#endregion


  // LẤY ID SINH VIÊN PHỤC VỤ VIỆC THÊM SV VÀO LỚP
  ChiTietSinhVien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietSinhVien/${masv}`;
    return this.http.get<any>(url);
  }

}
