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
export class HocphanService {
  readonly APIUrl="http://localhost:44169/api";
  constructor(private http: HttpClient) { }
  getAll():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/hocphans');
  }
  pagination(data: any): Observable<any> {
    const url = `${this.APIUrl}/hocphans/pagination`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  getByid(maloai: any): Observable<any> {
    const url = `${this.APIUrl}/hocphans/${maloai}`;
    return this.http.get<any>(url);
  }
  add(hp:any){
    return this.http.post(this.APIUrl+'/hocphans/',hp);
  }

  update(hp:any){
    return this.http.put(this.APIUrl+'/hocphans/',hp);
  }
  
  delete(mahp:any){
    return this.http.delete(this.APIUrl+'/hocphans/'+mahp);
  }
}
