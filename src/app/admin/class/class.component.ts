import {
  Component,
  Injector,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  model: any = {
    id: undefined,
    code: undefined,
    name: undefined,
    status: true,
    students: [],
  };

  gender = [
    {
      code: true,
      name: 'Nam',
    },
    {
      code: false,
      name: 'Nữ',
    },
  ];

  ngOnInit(): void {}
  addNewFormChildren() {
    const item = {
      stt: null,
      code: 'SV-',
      name: null,
      bith: null,
      phone: null,
      gender: true,
    };
    this.model.students?.push(item);
  }
  override viewEdit(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
    this.model.students = item.students || [];
    
    this.model.students.forEach((x:any)=>{
      x.bith = new Date(x.bith);
      x.stt=x.stt;
      x.name=x.name;
      return x;
    })
    console.log(item);
    console.log(this.form);

  }
  override closeForm() {
    
    this.modal.nativeElement.querySelector('button.close').click();
  }
  override save() {
    this.model.students.forEach((x: any, i: number) => {
      x.bith = new Date(x.bith).getTime();
      x.stt = i+1;
    });
    if (this.model.id !== undefined) {
      this.update();
    } else {
      this.create();
    }
  }
}
