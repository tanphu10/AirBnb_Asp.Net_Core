import { Component } from '@angular/core';
import {
  AdminApiCommentsApiClient,
  AdminApiRoomApiClient,
  CommentDto,
  CommentInListDtoPagedResult,
  RoomDto,
} from 'src/app/api/admin-api.service.generated';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AlertService } from './../../../shared/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { CommentDetailComponent } from './comment-detail.component';
import { MessageConstants } from './../../../shared/constants/message.constant';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentsComponent {
  //System variables
  private ngUnsubscribe = new Subject<void>();
  public blockedPanel: boolean = false;
  public roomCategories: any[] = [];

  //Paging variables
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalCount?: number;

  //Business variables
  public items: CommentDto[] | undefined;
  public selectedItems: CommentDto[] = [];
  public keyword: string = '';
  public roomId?: string = null;

  constructor(
    private commentService: AdminApiCommentsApiClient,
    public dialogService: DialogService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private roomService: AdminApiRoomApiClient
  ) {}
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    var categories = this.roomService.getAllRequest();
    this.toggleBlockUI(true);
    forkJoin({
      categories,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: any) => {
          var categories = response.categories as RoomDto[];
          categories.forEach((element) => {
            this.roomCategories.push({
              value: element.id,
              label: element.name,
            });
          });
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
    this.loadData();
  }
  loadData() {
    this.toggleBlockUI(true);
    this.commentService
      .getPagingComment(this.keyword,this.roomId, this.pageIndex, this.pageSize)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: CommentInListDtoPagedResult) => {
          // console.log('check category', response);
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
    const ref = this.dialogService.open(CommentDetailComponent, {
      header: 'Thêm mới loại bài viết',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: CommentDto) => {
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
    const ref = this.dialogService.open(CommentDetailComponent, {
      data: {
        id: id,
      },
      header: 'Cập nhật loại bài viết',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: CommentDto) => {
      if (data) {
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData();
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

    this.commentService.delete(ids).subscribe({
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
