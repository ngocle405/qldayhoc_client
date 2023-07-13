import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';
import { PeriodService } from '../services/period.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
})
export class PeriodComponent extends BaseTableComponent implements OnInit {
  constructor(
    injector: Injector,
    service: PeriodService,
    private ser: PeriodService
  ) {
    super(injector, service);
  }
  selectedItem: any[] = [];
  array: any = [];
  model = {};
  ngOnInit(): void {}
  getAll() {
    this.service.get().subscribe({
      next: (data: any) => {
        this.array = data.map((x: any) => {
          x.isEdit = true;
          return x;
        });
      },
    });
  }
  addLine() {
    this.array?.push({
      code: null,
      name: null,
    });
  }
  override viewEdit(item: any) {
    item.isEdit = false;
  }

  open() {
    this.getAll();
  }
  saveData(item: any) {
    //  const data =this.array.filter((x:any)=> x.id !== element.id)
    if (item.id) {
      this.service.update(item.id, item).subscribe({
        next: () => {
          this.messageService?.success('Cập nhật thành công');
          this.getAll();
          this.search();
        },
      });
    } else {
      this.service.create(item).subscribe({
        next: () => {
          this.search();
          this.getAll();
          this.messageService?.success('Cập nhật thành công');
        },
      });
    }
  }
  idSelect: number = 0;
  select(event:any) {
   this.idSelect =+event.checked.toString()
    console.log(event.checked.toString());
  }
  // removeSelect() {
  //   this.ser.deleteSelected({...this.idSelect}).subscribe({
  //     next: (value) => {
  //       console.log('success');
  //       this.search();
  //     },
  //   });
  // }
}
