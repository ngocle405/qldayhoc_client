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
export class GiangdayService {

  constructor(private httpClient: HttpClient) { }
  readonly APIUrl="http://localhost:44169/api";

  //load dữ liệu
  getAll():Observable<any[]>{
    return this.httpClient.get<any>(this.APIUrl+'/giangdays');
  }
  pagination(data: any): Observable<any> {
    const url = `${this.APIUrl}/giangdays/pagination`;
    var body = JSON.stringify(data);
    return this.httpClient.post<any>(url, body, httpOptions);
  }
  dsthaoluan(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/thaoluans/thaoluan/${mabg}`;
    return this.httpClient.get<any>(url);
  }
  dsbaigiang(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/giangdays/baigiang/${mabg}`;
    return this.httpClient.get<any>(url);
  }
  //
  //thêm dữ liệu
  addThaoluan(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/thaoluans/addthaoluan`;
    var body = JSON.stringify(baigiang);
    return this.httpClient.post<any>(url, body, httpOptions);
  }
  addBaigiang(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/giangdays/addbaigiang`;
    var body = JSON.stringify(baigiang);
    return this.httpClient.post<any>(url, body, httpOptions);
  }
  //
  //xóa tất cả
  deleteThaoluan(malop:any){
    return this.httpClient.delete(this.APIUrl+'/thaoluans/'+malop);
  }
  deleteBaigiang(malop:any){
    return this.httpClient.delete(this.APIUrl+'/giangdays/deletebaigiang/'+malop);
  }
  deleteTailieu(malop:any){
    return this.httpClient.delete(this.APIUrl+'/tailieus/'+malop);
  }
  deleteBaitap(malop:any){
    return this.httpClient.delete(this.APIUrl+'/baitaps/'+malop);
  }
  //
  dssv(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/hoctaps/giangday/${mabg}`;
    return this.httpClient.get<any>(url);
  }
  addsv(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/hoctaps/`;
    var body = JSON.stringify(baigiang);
    return this.httpClient.post<any>(url, body, httpOptions);
  }
  loadsv(){
    const url = `${this.APIUrl}/hoctaps/loadsinhvien/`;
    return this.httpClient.get<any>(url);
  }
}
