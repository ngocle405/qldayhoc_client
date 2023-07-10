import { Component, OnInit, Injector } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components/base-table.component';
import { TermService } from '../services/term.service';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
})
export class TermComponent extends BaseTableComponent implements OnInit {
  constructor(inject: Injector, service: TermService) {
    super(inject, service);
  }

  ngOnInit(): void {}
}
