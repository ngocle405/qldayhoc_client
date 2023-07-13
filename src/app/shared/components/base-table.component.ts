import { Subscription } from 'rxjs';
import { Injector, OnDestroy, ChangeDetectorRef, Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/core/models/user-profile.model';
import { SessionService } from 'src/app/core/services/session.service';
import { StreamDataService } from 'src/app/core/services/stream-data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { ScreenType, SessionKey } from 'src/app/core/utils/enums';
import { FunctionModel } from 'src/app/core/models/function.model';
import { DataTable } from 'src/app/core/models/data-table.model';
import { BaseService } from 'src/app/core/services/base.service';
import { PaginatorModel } from 'src/app/core/models/paginator.model';
import { ActionConfig } from 'src/app/core/models/action-config.model';
import { cloneDeep } from 'lodash';
import * as _ from 'lodash';
import { LoadingService } from 'src/app/core/services/loading.service';
import { mapDataTable } from 'src/app/core/utils/common-functions';

@Component({
  template: `<ng-content></ng-content>`,
  providers: [DialogService],
})
export class BaseTableComponent implements OnDestroy {
  public objFunction: FunctionModel | undefined;
  public currUser: UserProfileModel;
  public loadingService!: LoadingService;
  protected messageService: NotificationMessageService | undefined;
  protected dialogService: DialogService | undefined;
  protected router: Router | undefined;
  protected route: ActivatedRoute | undefined;
  protected location: Location | undefined;
  protected streamDataService: StreamDataService | undefined;
  protected sessionService: SessionService | undefined;
  protected ref: ChangeDetectorRef | undefined;
  protected fb: FormBuilder | undefined;

  stateData: any;
  propData: any;
  dataTable: DataTable = {
    content: [],
    currentPage: 1,
    limit: 3,
    totalElements: 1,
    totalPages: 0,
    totalRecords: 0,
    size: 0
  };
  configAction: ActionConfig | undefined;
  prevParams: any;
  params: FormGroup | undefined | any;
  fileNameExcel = 'list-data.xlsx';
  subscription: Subscription | undefined;
  subscriptions: Subscription[] = [];
  length: number = 0;
  key: string = '';
  model: any = {};
  @ViewChild('form', { static: false }) form!: NgForm;
  @ViewChild('modal', { static: false }) modal!: ElementRef;

  constructor(private injector: Injector, protected service: BaseService) {
    this.init();
    this.initConfigAction();
    this.getState();
    this.currUser = this.sessionService?.getSessionData(SessionKey.UserProfile);
  }

  init() {
    this.messageService = this.injector.get(NotificationMessageService);
    this.dialogService = this.injector.get(DialogService);
    this.fb = this.injector.get(FormBuilder);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.location = this.injector.get(Location);
    this.streamDataService = this.injector.get(StreamDataService);
    this.sessionService = this.injector.get(SessionService);
    this.ref = this.injector.get(ChangeDetectorRef);
    this.loadingService = this.injector.get(LoadingService);
  }

  initConfigAction() { }

  getState() {
    this.service.getState().subscribe({
      next: (state) => {
        this.propData = cloneDeep(state);
        this.stateData = cloneDeep(state);
        this.mapState();
        this.search();
        this.getLength();
      },
    });
  }
  getLength() {
    this.service.getLength().subscribe({
      next: (value) => {
        this.length = value.length | 0;
      },
    })
  }

  mapState() { }

  search(firstPage?: boolean) {
    if (firstPage) {
      this.dataTable.currentPage = 1;
    }

    this.loadingService.start();
    const params = this.mapDataSearch();

    this.service.search(params).subscribe({
      next: (data) => {
        this.dataTable = mapDataTable(data, params);
        console.log(this.dataTable);
        
        this.loadingService.complete();
        this.prevParams = params;
      },
      error: () => {
        this.loadingService.complete();
      },
    });
  }
  mapDataSearch() {
    const params = {
      _page: this.dataTable.currentPage,
      _limit: this.dataTable.size,

      ...this.params,
    };
    return params;
  }

  pageChange(paginator: PaginatorModel) {

      this.dataTable.currentPage = paginator.page + 1;
    
    this.dataTable.size = paginator.rows;
    this.search();
  }
  viewEdit(item: any) {
    this.model = JSON.parse(JSON.stringify(item));
  }







  deleteItem(id: string | number) {
    if (this.loadingService.loading) {
      return;
    }
    this.messageService?.confirm().subscribe((isConfirm) => {
      if (isConfirm) {
        this.loadingService.start();
        this.service.delete(id).subscribe({
          next: () => {
            this.messageService?.success('Thực hiện xoá bản ghi thành công');
            this.search();
          },
          error: (e) => {
            this.loadingService.complete();
            this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
          },
        });
      }
    });
  }
  save() {
    if (this.model.id !== undefined) {
      this.update();
    } else {
      this.create();
    }


  }
  create() {
    this.service.create(this.model).subscribe({
      next: () => {
        this.closeForm();
        this.messageService?.success('Thao tác thành công');
        this.search();
        this.getLength();
      },
    })
  }
  closeForm() {
    this.form?.resetForm();
    this.modal.nativeElement.querySelector('button.close').click();
  }

  update() {
    this.service.update(this.model.id!, this.model).subscribe({
      next: () => {
        this.messageService?.success('Thao tác thành công');
        this.closeForm();
        this.search();
      },
    })
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.search();
        this.getLength();
      },
    });
  }
  // exportExcel() {
  //   this.loadingService.start();
  //   this.service.exportExcel(this.fileNameExcel, this.prevParams).subscribe({
  //     next: () => {
  //       this.loadingService.complete();
  //     },
  //     error: () => {
  //       this.loadingService.complete();

  //       this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
  //     },
  //   });
  // }

  onDestroy() { }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptions?.forEach((sub) => {
      sub.unsubscribe();
    });
    this.onDestroy();
  }
}
