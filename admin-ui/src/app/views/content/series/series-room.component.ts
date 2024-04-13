import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Subject, takeUntil } from "rxjs";
import { AddRoomSeriesRequest, AdminApiSeriesApiClient, RoomInListDto }  from '../../../api/admin-api.service.generated';
import { MessageConstants } from '../../../shared/constants/message.constant';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  templateUrl: "series-room.component.html",
})
export class SeriesRoomsComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  public blockedPanel: boolean = false;
  public title: string;
  public posts: RoomInListDto[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private seriesApiClient: AdminApiSeriesApiClient,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.toggleBlockUI(true);
    this.loadData(this.config.data?.id);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadData(id: string) {
    this.toggleBlockUI(true);
    console.log("check series id =>>",id)
    this.seriesApiClient.getRoomInSeries(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: RoomInListDto[]) => {
          console.log("roomInList",response);
          this.posts = response;
          this.toggleBlockUI(false);
        },
        error: (error) => {
          this.toggleBlockUI(false);
        }
      }
      );
  }
  removePost(id: string) {
    var body: AddRoomSeriesRequest = new AddRoomSeriesRequest({
      roomId: id,
      seriesId: this.config.data.id
    });
    this.seriesApiClient
      .deleteRoomsSeries(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.alertService.showSuccess(MessageConstants.DELETED_OK_MSG);
          this.loadData(this.config.data?.id);
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