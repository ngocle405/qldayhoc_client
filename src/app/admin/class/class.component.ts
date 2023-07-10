import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';
import * as _ from 'lodash';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
})
export class ClassComponent extends BaseTableComponent implements OnInit {
  constructor(inject: Injector, private serivce: ClassService) {
    super(inject, serivce);
  }
  model = { id: undefined, code: undefined, name: undefined, status: true }

  ngOnInit(): void {
  }

}
