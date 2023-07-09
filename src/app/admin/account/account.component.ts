import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent extends BaseTableComponent implements OnInit {
  override params = {
    name: '',
    userName: '',
  }

  constructor(inject:Injector, service:AdminService) { 
    super(inject,service)
  }

  ngOnInit(): void {
  }
  onReset() {
    this.params.name = '';
    this.params.userName = '';

  }
  viewDetail(id:number){

  }
  viewEdit(id:number){

  }
  viewCreate(){
    
  }

}
