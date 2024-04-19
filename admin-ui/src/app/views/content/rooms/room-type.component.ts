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
  AdminApiTypesApiClient,
  TypeInListDto,
  AddRoomToTypeRequest,
} from '../../../api/admin-api.service.generated';
import { MessageConstants } from '../../../shared/constants/message.constant';
import { AlertService } from '../../../shared/services/alert.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  templateUrl: 'room-type.component.html',
})
export class RoomTypesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public allTypes: any[] = [];
  public roomTypes: any[];
  public selectedEntity: RoomDto;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilityService,
    private fb: FormBuilder,
    private roomApiClient: AdminApiRoomApiClient,
    private typeApiClient: AdminApiTypesApiClient,
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
    typeId: [{ type: 'required', message: 'Bạn phải chọn loạt bài' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };

  ngOnInit() {
    //Init form
    this.buildForm();
    //Load data to form
    var types = this.typeApiClient.getAllTypeRoom();
    this.toggleBlockUI(true);
    forkJoin({
      types,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: any) => {
          // console.log("series response =>>>",repsonse)
          //Push categories to dropdown list
          var types = repsonse.types as TypeInListDto[];
          types.forEach((element) => {
            this.allTypes.push({
              value: element.id,
              label: element.typeName,
            });
          });
          if (this.utilService.isEmpty(this.config.data?.id) == false) {
            this.loadTypes(this.config.data?.id);
          } else {
            this.toggleBlockUI(false);
          }
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }
  loadTypes(id: string) {
    // console.log('get series id r', id);
    this.roomApiClient
      .getTypesBelong(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: TypeInListDto[]) => {
          // console.log('roomTypes', response);
          this.roomTypes = response;
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
    var body: AddRoomToTypeRequest = new AddRoomToTypeRequest({
      roomId: this.config.data.id,
      typeId: id,
    });
    this.typeApiClient
      .deleteRoomsFromTypes(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.alertService.showSuccess(MessageConstants.DELETED_OK_MSG);
          this.loadTypes(this.config.data?.id);
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
    var body: AddRoomToTypeRequest = new AddRoomToTypeRequest({
      roomId: this.config.data.id,
      typeId: this.form.controls['typeId'].value,
      displayOrder: this.form.controls['sortOrder'].value,
    });
    this.typeApiClient
      .addRoomToTypes(body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.alertService.showSuccess('Đã thêm room vào types thành công');
          this.loadTypes(this.config.data?.id);
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
      typeId: new FormControl(null, Validators.required),
      sortOrder: new FormControl(0, Validators.required),
    });
  }
}
