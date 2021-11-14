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

export class GiaovienService {

  private API_URL = 'http://localhost:44169/api';
  readonly PhotoUrl = "http://localhost:44169/Photos/giaovien";
  private userLogin = new BehaviorSubject({});
  public user$ = this.userLogin.asObservable();
  constructor(private readonly http: HttpClient) { }
  public get userValue(): any {
    return this.userLogin.value;
  }
  login(login: any): Observable<any> {
    const url = `${this.API_URL}/giaoviens/login`;
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
  update(val: any) {
    return this.http.put(this.API_URL + '/giaoviens', val);
  }
  add(val:any){
    return this.http.post(this.API_URL+'/giaoviens/',val);
  }
  UploadPhoto(val: any) {
    return this.http.post(this.API_URL + '/giaoviens/SaveFile', val);
  }
  getAll():Observable<any[]>{
    return this.http.get<any>(this.API_URL+'/giaoviens');
  }
  pagination(data: any): Observable<any> {
    const url = `${this.API_URL}/giaoviens/pagination`;
    var body = JSON.stringify(data);
    return this.http.post<any>(url, body, httpOptions);
  }
  delete(val:any){
    return this.http.delete(this.API_URL+'/giaoviens/'+val);
  }
  getByid(magv: any): Observable<any> {
    const url = `${this.API_URL}/giaoviens/${magv}`;
    return this.http.get<any>(url);
  }

  
}
