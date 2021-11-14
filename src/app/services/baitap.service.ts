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
export class BaitapService {

  constructor(private http: HttpClient) { }
  readonly APIUrl="http://localhost:44169/api";
 
  readonly PhotoUrl = "http://localhost:44169/Photos/baitap";
  pagination(data: any): Observable<any> {
    const url = `${this.APIUrl}/baitaps/pagination`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  delete(mafile:any){
    return this.http.delete(this.APIUrl+'/baitaps/'+mafile);
  }
  UploadBaitap(val: any) {
    return this.http.post(this.APIUrl + '/baitaps/SaveFile', val);
  }
  dsbaitap(mabg: any): Observable<any> {
    const url = `${this.APIUrl}/baitaps/Baitap/${mabg}`;
    return this.http.get<any>(url);
  }
  addBaitap(baigiang: any): Observable<number> {
    const url = `${this.APIUrl}/baitaps`;
    var body = JSON.stringify(baigiang);
    return this.http.post<any>(url, body, httpOptions);
  }
}
