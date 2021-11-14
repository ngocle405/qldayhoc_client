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
export class AdminCPService {
  private API_URL = 'http://localhost:44169/api';
  private adminLogin = new BehaviorSubject({});
  public admin$ = this.adminLogin.asObservable();
  constructor(private readonly http: HttpClient) { }
  login(login: any): Observable<any> {
    const url = `${this.API_URL}/admins/login`;
    var log = JSON.stringify(login);
    return this.http.post<any>(url, log, httpOptions).pipe(
      map((admin) => {
        //debugger;
        localStorage.setItem('admin', JSON.stringify(admin));
        this.adminLogin.next(admin);
        return admin;
      })
    );
  }
  logout() {
    localStorage.removeItem('admin');
    this.adminLogin.next(null!);
  }
}
