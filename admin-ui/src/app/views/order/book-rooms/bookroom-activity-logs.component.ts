import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {  Subject, takeUntil } from 'rxjs';
import {
  AdminApiBookRoomApiClient,
  BookRoomActivityLogDto,
} from '../../../api/admin-api.service.generated';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  templateUrl: 'bookroom-activity-logs.component.html',
})
export class BookRoomActivityLogsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public items: any[] = [];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilityService,
    private bookroomApiClient: AdminApiBookRoomApiClient
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    //Load data to form
    this.toggleBlockUI(true);
    this.bookroomApiClient
      .getActivityLog(this.config.data.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: BookRoomActivityLogDto[]) => {
          this.items = repsonse;
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.btnDisabled = true;
      this.blockedPanelDetail = true;
    } else {
      setTimeout(() => {
        this.btnDisabled = false;
        this.blockedPanelDetail = false;
      }, 1000);
    }
  }
}
