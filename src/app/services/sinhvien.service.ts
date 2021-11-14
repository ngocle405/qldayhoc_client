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
export class SinhvienService {

  public readonly APIUrl="http://localhost:44169/api";
  readonly PhotoUrl = "http://localhost:44169/Photos/";
  private userLogin = new BehaviorSubject({});
  public user$ = this.userLogin.asObservable();
  constructor(private readonly http: HttpClient) { }
  public get userValue(): any {
    return this.userLogin.value;
  }
  login(login: any): Observable<any> {
    const url = `${this.APIUrl}/sinhviens/login`;
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
//
  getAll():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/sinhviens');
  }
  pagination(data: any): Observable<any> {
    const url = `${this.APIUrl}/sinhviens/pagination`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  getByid(masv: any): Observable<any> {
    const url = `${this.APIUrl}/sinhviens/${masv}`;
    return this.http.get<any>(url);
  }
 
  add(sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/sinhviens`;
    var body = JSON.stringify(sinhvien);
    return this.http.post<any>(url, body, httpOptions);
  }
  
  delete(malop:any){
    return this.http.delete(this.APIUrl+'/sinhviens/'+malop);
  }
  update(masv: any, sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/sinhviens/${masv}`;
    var body = JSON.stringify(sinhvien);
    return this.http.put<any>(url, body, httpOptions);
  }
  getLophoc():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/sinhviens/GetLophoc');
  }
  //hoctap ->sv
  gochoctap(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/gochoctap/${masv}`;
    return this.http.get<any>(url);
  }
  getbaigiangsinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/baigiangsinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  gettailieusinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/tailieusinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  getbaitapsinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/baitapsinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  getthaoluansinhvien(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/thaoluansinhvien/${masv}`;
    return this.http.get<any>(url);
  }
  getidbaitap(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/getIdBaitap/${masv}`;
    return this.http.get<any>(url);
  }
  //
  baitapdanop(masv: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/baitapdanop/${masv}`;
    return this.http.get<any>(url);
  }
  //add nop bai tap
  nopbaitap(sinhvien: any): Observable<number> {
    const url = `${this.APIUrl}/hoctaps/thembaitap`;
    var body = JSON.stringify(sinhvien);
    return this.http.post<any>(url, body, httpOptions);
  }
  UploadFileNopBaitap(val: any) {
    return this.http.post(this.APIUrl + '/hoctaps/SaveFile', val);
  }
  //ghs canhan sv
  updateHoso(val:any){
    return this.http.put(this.APIUrl+'/sinhviens/hosocannhan',val);
  }
  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/sinhviens/SaveFile', val);
  }
}
