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
export class ClassService extends BaseService {

  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/class`);

  }

 
}
