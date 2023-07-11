import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeriodService extends BaseService {

  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/period`);
  }

  updateItems(items: any[]): Observable<any[]> {
    return this.http.post<any[]>(environment.endpoint_url + '/period', items);
  }
 
}
