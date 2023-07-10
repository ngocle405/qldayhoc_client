import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TermService extends BaseService {

  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/term`);
  }

 
}
