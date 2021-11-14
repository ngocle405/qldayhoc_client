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

export class LophocService {

  readonly APIUrl="http://localhost:44169/api";
  readonly PhotoUrl = "http://localhost:44169/Photos/tailieu";
  constructor(private http: HttpClient) { }
  getAll():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/lophocs');
  }
  pagination(data: any): Observable<any> {
    const url = `${this.APIUrl}/lophocs/pagination`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  getByid(malop: any): Observable<any> {
    const url = `${this.APIUrl}/lophocs/${malop}`;
    return this.http.get<any>(url);
  }
  // add(hp:any){
  //   return this.http.post(this.APIUrl+'/lophocs/',hp);
  // }
  add(lophoc: any): Observable<number> {
    const url = `${this.APIUrl}/lophocs`;
    var body = JSON.stringify(lophoc);
    return this.http.post<any>(url, body, httpOptions);
  }
  // update(hp:any){
  //   return this.http.put(this.APIUrl+'/lophocs/',hp);
  // }
  
  delete(malop:any){
    return this.http.delete(this.APIUrl+'/lophocs/'+malop);
  }
  update(malop: any, lophoc: any): Observable<number> {
    const url = `${this.APIUrl}/lophocs/${malop}`;
    var body = JSON.stringify(lophoc);
    return this.http.put<any>(url, body, httpOptions);
  }

  //
  // getLopday():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/dayhocs');
  // }
  getLopday(malop: any): Observable<any> {
    const url = `${this.APIUrl}/giangdays/${malop}`;
    return this.http.get<any>(url);
  }
  deleteLopday(malop:any){
    return this.http.delete(this.APIUrl+'/giangdays/'+malop);
  }
  addLopday(lophoc: any): Observable<number> {
    const url = `${this.APIUrl}/giangdays`;
    var body = JSON.stringify(lophoc);
    return this.http.post<any>(url, body, httpOptions);
  }
  getLophoc():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/giangdays/GetLophoc');
  }
  getHocphan():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/giangdays/getHocphan');
  }
  //
  xemlop(malop: any): Observable<any> {
    const url = `${this.APIUrl}/giangdays/xemlop/${malop}`;
    return this.http.get<any>(url);
  }
//
 

  //
  addtailieu(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/tailieus`;
    var body = JSON.stringify(baigiang);
    return this.http.post<any>(url, body, httpOptions);
  }
  tailieu(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/tailieus/tailieu/${mabg}`;
    return this.http.get<any>(url);
  }
  UploadFile(val: any) {
    return this.http.post(this.APIUrl + '/tailieus/SaveFile', val);
  }
}
