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
export class TailieuService {

  constructor(private http: HttpClient) { }
  readonly APIUrl="http://localhost:44169/api";
  pagination(data: any): Observable<any> {
    const url = `${this.APIUrl}/tailieus/pagination`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  delete(mafile:any){
    return this.http.delete(this.APIUrl+'/tailieus/'+mafile);
  }
}
