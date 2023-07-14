import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { DataTable } from '../models/data-table.model';
import { cleanDataTable} from '../utils/common-functions';
@Injectable()
export class BaseService {
  constructor(public http: HttpClient, @Inject(String) public baseURL: string) {
    this.baseUrl = baseURL;
  }

  baseUrl!: string;
  state: any;

  getState(): Observable<any> {
    return of(this.state);
  }
  get() {
    return this.http.get(this.baseURL)
  }
  getLength() {
    return this.http
      .get<any>(`${this.baseUrl}`)

  }
  search(params?: any): Observable<DataTable> {
    const newParam: any = cleanDataTable(params);

    return this.http
      .get<DataTable>(`${this.baseUrl}`, {
        params: { ...newParam },
      });
  }

  findByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${code}`);
  }
  findById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
  updateStatus( id: string, data: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/'updateStatus'/${id}`, data);
  }

  updateAction(id: string, data: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, data);
  }
  update(id:number|string,data: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, data);
  }
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
 
  // exportExcel(fileName: string, params: any, isBase64?: boolean): Observable<boolean> {
  //   const responseType = isBase64 ? 'json' : 'arraybuffer';
  //   const option: any = { params, responseType };

  //   return this.http.get(`${this.baseUrl}/export`, option).pipe(
  //     map((res: any) => {
  //       if (isBase64) {
  //         res = dataURItoBlob(res?.data);
  //       }
  //       saveAs(
  //         new Blob([res], {
  //           type: 'application/octet-stream',
  //         }),
  //         fileName
  //       );
  //       return true;
  //     })
  //   );
  // }
  UploadFileFormData(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/UploadPhotos', data);
  }
}
