import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DataTable } from '../../core/models/data-table.model';
import { cleanDataTable, mapDataTable,  } from '../../core/utils/common-functions';
import { map} from 'rxjs/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {

  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}`);

  }
  getClass(): Observable<any> {
    return this.http.get(environment.endpoint_url + '/class')
  }
  postClass(data:any){
    return this.http.post(environment.endpoint_url+ '/class', data)
  }
  updateClass(id:number,data:any){
    return this.http.put(environment.endpoint_url+ '/class/'+ id, data)
  }
  changeStatus(id:number,status:boolean){
    return this.http.put(environment.endpoint_url+ '/class/'+ id, status)
  }
  deleteClass(id: number) {
    return this.http.delete(environment.endpoint_url+ '/class/'+ id,)
  }
  override search(params?: any): Observable<DataTable> {
    const newParam: any = cleanDataTable(params);

    return this.http
      .get<DataTable>(`${environment.endpoint_url}/class`, {
        params: { ...newParam },
      })
  }
}
