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
export class TrangsinhvienService {
  public readonly APIUrl="http://localhost:44169/api/TrangSinhViens";
  readonly PhotoUrl = "http://localhost:44169/Photos/";
  constructor(private readonly http: HttpClient) { }

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
        localStorage.setItem('sinhvien', JSON.stringify(user));
        this.userLogin.next(user);
        return user;
      })
    );
  }
  logout() {
    localStorage.removeItem('sinhvien');
    this.userLogin.next(null!);
  }


  //hoctap ->sv
  gochoctap(masv: any): Observable<any> {
    const url = `${this.APIUrl}/gochoctap/${masv}`;
    return this.http.get<any>(url);
  }
  // 
  // hiển thị bài giảng,tài liệu,bài tập,thảo luận
  getbaigiangsinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/baigiangsinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  gettailieusinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/tailieusinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  getbaitapsinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/baitapsinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  getthaoluansinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/thaoluansinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  //chi tiết bài tập
  
  //#region chi tiết bài tập giáo viên đã đăng hiển thị lên cho sv thấy 
  // chi tiết bài tập giáo viên đã đăng hiển thị lên cho sv thấy 
  ChiTietBaiTap(mabt: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietBaiTap/${mabt}`;
    return this.http.get<any>(url);
  }
  // ds bt sv đã nộp
  baitapdanop(mabt: any,masv:any): Observable<any> {
    const url = `${this.APIUrl}/BaiTapDaNop/${mabt}&&${masv}`;
    return this.http.get<any>(url);
  }
  //add nop bai tap
  nopbaitap(sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/ThemBaiTap`;
    var body = JSON.stringify(sinhvien);
    return this.http.post<any>(url, body, httpOptions);
  }
  UploadFileNopBaitap(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  HuyBaiTap(id: any) {
    return this.http.delete(this.APIUrl + '/HuyBaiTap/' + id);
  }
  //#endregion
  
 
  //#region CHI TIẾT SINH VIÊN,UPDATE SINH VIÊN,UPLOAD PHOTOS
  ChiTietSinhVien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/ChiTietSinhVien/${masv}`;
    return this.http.get<any>(url);
  }
  
  UpdateHoSoCaNhan(masv: any, sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/UpdateHoSoCaNhan/${masv}`;
    var body = JSON.stringify(sinhvien);
    return this.http.put<any>(url, body, httpOptions);
  }
  UploadPhotos(val: any) {
    return this.http.post(this.APIUrl + '/UploadPhotos', val);
  }
  //#endregion
  


  //#region SINH VIÊN CHỌN CHỨC NĂGN HỌC TRỰC TUYẾN  
  HocTrucTuyen(data: any): Observable<any> {
    const url = `${this.APIUrl}/HocTrucTuyen`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  //#endregion
}

