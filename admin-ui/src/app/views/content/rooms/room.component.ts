import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageConstants } from 'src/app/shared/constants/message.constant';
import { RoomDetailComponent } from './room-detail.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import {
  AdminApiRoomApiClient,
  AdminApiCategoryApiClient,
  RoomCategoryDto,
  RoomDto,
  RoomInListDto,
  RoomInListDtoPagedResult,
} from 'src/app/api/admin-api.service.generated';
import { RoomSeriesComponent } from './room-series.component';
import { RoomReturnReasonComponent } from './room-return-reason.component';
import { RoomActivityLogsComponent } from './room-activity-logs.component';
import {RoomTypesComponent} from './room-type.component';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
  //System variables
  private ngUnsubscribe = new Subject<void>();
  public blockedPanel: boolean = false;

  //Paging variables
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalCount: number;

  //Business variables
  public items: RoomInListDto[];
  public selectedItems: RoomInListDto[] = [];
  public keyword: string = '';

  public categoryId?: string = null;
  public roomCategories: any[] = [];

  constructor(
    private roomCategoryApiClient: AdminApiCategoryApiClient,
    private roomApiClient: AdminApiRoomApiClient,
    public dialogService: DialogService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.loadPostCategories();
    this.loadData();
  }

  loadData(selectionId = null) {
    this.toggleBlockUI(true);
    this.roomApiClient
      .getRoomsPaging(
        this.keyword,
        this.categoryId,
        this.pageIndex,
        this.pageSize
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: RoomInListDtoPagedResult) => {
          this.items = response.results;
          this.totalCount = response.rowCount;
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  loadPostCategories() {
    this.roomCategoryApiClient
      .getAllRoomCategory()
      .subscribe((response: RoomCategoryDto[]) => {
        response.forEach((element) => {
          this.roomCategories.push({
            value: element.id,
            label: element.name,
          });
        });
      });
  }

  showAddModal() {
    const ref = this.dialogService.open(RoomDetailComponent, {
      header: 'Thêm mới bài viết',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: RoomCategoryDto) => {
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
    const ref = this.dialogService.open(RoomDetailComponent, {
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
    ref.onClose.subscribe((data: RoomDto) => {
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
    this.roomApiClient.deleteRooms(ids).subscribe({
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
  addToSeries(id: string) {
    // console.log("first",id)
    const ref = this.dialogService.open(RoomSeriesComponent, {
      data: {
        id: id,
      },
      header: 'Thêm vào loạt bài',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: RoomDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }
  addToTypes(id: string) {
    // console.log("first",id)
    const ref = this.dialogService.open(RoomTypesComponent, {
      data: {
        id: id,
      },
      header: 'Thêm vào Type-Rooms',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: RoomDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }
  approve(id: string) {
    this.toggleBlockUI(true);
    this.roomApiClient.approveRoomPost(id).subscribe({
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
    this.roomApiClient.sendToApproveRoomPost(id).subscribe({
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
    const ref = this.dialogService.open(RoomReturnReasonComponent, {
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
    ref.onClose.subscribe((data: RoomDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }

  showLogs(id: string) {
    const ref = this.dialogService.open(RoomActivityLogsComponent, {
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
    ref.onClose.subscribe((data: RoomDto) => {
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
