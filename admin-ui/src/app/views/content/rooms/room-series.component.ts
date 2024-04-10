import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import {
  AdminApiRoomApiClient,
  RoomDto,
  AdminApiSeriesApiClient,
  SeriesInListDto,
  AddRoomSeriesRequest,
} from '../../../api/admin-api.service.generated';
import { MessageConstants } from '../../../shared/constants/message.constant';
import { AlertService } from '../../../shared/services/alert.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  templateUrl: 'room-series.component.html',
})
export class RoomSeriesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public allSeries: any[] = [];
  public postSeries: any[];
  public selectedEntity: RoomDto;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilityService,
    private fb: FormBuilder,
    private postApiClient: AdminApiRoomApiClient,
    private seriesApiClient: AdminApiSeriesApiClient,
    private alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    seriesId: [{ type: 'required', message: 'Bạn phải chọn loạt bài' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };

  ngOnInit() {
    //Init form
    this.buildForm();
    //Load data to form
    var series = this.seriesApiClient.getAllSeries();
    this.toggleBlockUI(true);
    forkJoin({
      series,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: any) => {
          console.log("series response =>>>",repsonse)
          //Push categories to dropdown list
          var series = repsonse.series as SeriesInListDto[];
          series.forEach((element) => {
            this.allSeries.push({
              value: element.id,
              label: element.name,
            });
          });
          if (this.utilService.isEmpty(this.config.data?.id) == false) {
            this.loadSeries(this.config.data?.id);
          } else {
            this.toggleBlockUI(false);
          }
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }
  loadSeries(id: string) {
    // console.log('get series id r', id);
    this.postApiClient
      .getSeriesBelong(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: SeriesInListDto[]) => {
          // console.log('response', response);
          this.postSeries = response;
          this.toggleBlockUI(false);
        },
        error: (error) => {
          console.log('error', error);
          this.toggleBlockUI(false);
        },
      });
  }

  removeSeries(id: string) {
    // console.log("remove id series",id)
    var body: AddRoomSeriesRequest = new AddRoomSeriesRequest({
      roomId: this.config.data.id,
      seriesId: id,
    });
    this.seriesApiClient
      .deleteRoomsSeries(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.alertService.showSuccess(MessageConstants.DELETED_OK_MSG);
          this.loadSeries(this.config.data?.id);
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }
  saveChange() {
    this.toggleBlockUI(true);
    this.saveData();
  }

  private saveData() {
    this.toggleBlockUI(true);
    var body: AddRoomSeriesRequest = new AddRoomSeriesRequest({
      roomId: this.config.data.id,
      seriesId: this.form.controls['seriesId'].value,
      displayOrder: this.form.controls['sortOrder'].value,
    });
    this.seriesApiClient
      .addRoomToSeries(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.alertService.showSuccess('Đã thêm bài viết thành công');
          this.loadSeries(this.config.data?.id);
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
  buildForm() {
    this.form = this.fb.group({
      seriesId: new FormControl(null, Validators.required),
      sortOrder: new FormControl(0, Validators.required),
    });
  }
}
