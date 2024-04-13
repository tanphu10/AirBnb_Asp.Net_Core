import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiBookRoomApiClient,
  BookRoomInListDto,
  BookRoomsDtoPagedResult,
  BookRoomsDto,
  AdminApiLocationApiClient,
  LocationDto,
  AdminApiRoomApiClient,
  RoomInListDto,
} from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookRoomDetailComponent } from './bookroom-detail.component';
import { MessageConstants } from 'src/app/shared/constants/message.constant';
import { BookRoomReturnReasonComponent } from './bookroom-return-reason.component';
import { BookRoomActivityLogsComponent } from './bookroom-activity-logs.component';
@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
})
export class BookRoomComponent implements OnDestroy, OnInit {
  //System variables
  private ngUnsubscribe = new Subject<void>();
  public blockedPanel: boolean = false;

  //Paging variables
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalCount: number;
  //Business variables
  public items: BookRoomInListDto[];
  public selectedItems: BookRoomInListDto[] = [];
  public keyword: string = '';
  public roomId?: string = null;
  public roomLocations: any[] = [];
  constructor(
    private bookRoomApiClient: AdminApiBookRoomApiClient,
    private locationApiClient: AdminApiRoomApiClient,
    public dialogService: DialogService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.loadLocationCategories();
    this.loadData();
  }
  loadLocationCategories() {
    this.locationApiClient
      .getAllRequest()
      .subscribe((response: RoomInListDto[]) => {
        response.forEach((element) => {
          this.roomLocations.push({
            value: element.id,
            label: element.name,
          });
        });
      });
  }
  loadData(selectionId = null) {
    // console.log("roomId", this.roomId)
    // console.log("roomId", this.keyword)


    this.toggleBlockUI(true);
    this.bookRoomApiClient
      .getAllPagingBook(
        this.keyword,
        this.roomId,
        this.pageIndex,
        this.pageSize
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: BookRoomsDtoPagedResult) => {
          this.items = response.results;
          this.totalCount = response.rowCount;
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }
  showAddModal() {
    const ref = this.dialogService.open(BookRoomDetailComponent, {
      header: 'Thêm mới đặt phòng',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: BookRoomsDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.CREATED_OK_MSG);
        this.selectedItems = [];
        this.loadData();
      }
    });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.pageIndex = event.page + 1;
    this.pageSize = event.rows;
    this.loadData();
  }
  showEditModal() {
    if (this.selectedItems.length == 0) {
      this.alertService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    var id = this.selectedItems[0].id;
    const ref = this.dialogService.open(BookRoomDetailComponent, {
      data: {
        id: id,
      },
      header: 'Cập nhật bài viết',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: BookRoomsDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }
  deleteItems() {
    if (this.selectedItems.length == 0) {
      this.alertService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    var ids = [];
    this.selectedItems.forEach((element) => {
      ids.push(element.id);
    });
    this.confirmationService.confirm({
      message: MessageConstants.CONFIRM_DELETE_MSG,
      accept: () => {
        this.deleteItemsConfirm(ids);
      },
    });
  }
  deleteItemsConfirm(ids: any[]) {
    this.toggleBlockUI(true);
    this.bookRoomApiClient.deleteBookRooms(ids).subscribe({
      next: () => {
        this.alertService.showSuccess(MessageConstants.DELETED_OK_MSG);
        this.loadData();
        this.selectedItems = [];
        this.toggleBlockUI(false);
      },
      error: () => {
        this.toggleBlockUI(false);
      },
    });
  }
  approve(id: string) {
    this.toggleBlockUI(true);
    this.bookRoomApiClient.approveRequestBookRoom(id).subscribe({
      next: () => {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.loadData();
        this.selectedItems = [];
        this.toggleBlockUI(false);
      },
      error: () => {
        this.toggleBlockUI(false);
      },
    });
  }
  sendToApprove(id: string) {
    this.toggleBlockUI(true);
    this.bookRoomApiClient.sendUpdateBookRoom(id).subscribe({
      next: () => {
        // console.log("check send approve",id)
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.loadData();
        this.selectedItems = [];
        this.toggleBlockUI(false);
      },
      error: () => {
        this.toggleBlockUI(false);
      },
    });
  }
  reject(id: string) {
    const ref = this.dialogService.open(BookRoomReturnReasonComponent, {
      data: {
        id: id,
      },
      header: 'Trả lại bài',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: BookRoomsDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }
  showLogs(id: string) {
    const ref = this.dialogService.open(BookRoomActivityLogsComponent, {
      data: {
        id: id,
      },
      header: 'Xem lịch sử',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: BookRoomsDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }
  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }
}
