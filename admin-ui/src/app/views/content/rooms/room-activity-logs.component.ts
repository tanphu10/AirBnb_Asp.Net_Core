import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin, Subject, takeUntil } from 'rxjs';
// import { AddPostSeriesRequest, AdminApiPostApiClient, AdminApiSeriesApiClient, PostActivityLogDto, PostDto, SeriesInListDto } from 'src/app/api/admin-api.service.generated';
import {
  AdminApiRoomApiClient,
  AdminApiCategoryApiClient,
  RoomCategoryDto,
  RoomDto,
  RoomInListDto,
  RoomActivityLogDto,
  RoomInListDtoPagedResult,
} from '../../../api/admin-api.service.generated';
import { MessageConstants } from '../../../shared/constants/message.constant';
import { AlertService } from '../../../shared/services/alert.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  templateUrl: 'room-activity-logs.component.html',
})
export class RoomActivityLogsComponent implements OnInit, OnDestroy {
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
    private roomApiClient: AdminApiRoomApiClient,
  ) { }

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
    this.roomApiClient.getActivityLog(this.config.data.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: RoomActivityLogDto[]) => {
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