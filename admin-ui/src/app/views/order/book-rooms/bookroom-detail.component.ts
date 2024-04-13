import {
  Component,
  OnInit,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { UtilityService } from '../../../shared/services/utility.service';
import {
  BookRoomsDto,
  AdminApiBookRoomApiClient,
  AdminApiRoomApiClient,
  RoomDto,
} from './../../../api/admin-api.service.generated';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  templateUrl: 'bookroom-detail.component.html',
})
export class BookRoomDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public btnDisabled = false;
  public saveBtnName: string;
  public roomCategories: any[] = [];
  // public arrLocations: any[] = [];
  selectedEntity = {} as BookRoomsDto;
  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();
  public booleanValue: boolean;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilityService,
    private fb: FormBuilder,
    private bookRoomApiClient: AdminApiBookRoomApiClient,
    private roomApiClient: AdminApiRoomApiClient
  ) {}
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  validateBoolean(value: string) {
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      this.booleanValue = value.toLowerCase() === 'true';
    } else {
      // Có thể cung cấp phản hồi cho người dùng nếu giá trị không hợp lệ
    }
  }
  // public generateSlug() {
  //   var slug = this.utilService.makeSeoTitle(this.form.get('name').value);
  //   this.form.controls['slug'].setValue(slug);
  // }
  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    name: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'minlength', message: 'Bạn phải nhập ít nhất 3 kí tự' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    slug: [{ type: 'required', message: 'Bạn phải URL duy nhất' }],
    description: [{ type: 'required', message: 'Bạn phải nhập mô tả ngắn' }],
  };

  ngOnInit() {
    //Init form
    this.buildForm();
    //Load data to form
    var rooms = this.roomApiClient.getAllRequest();

    this.toggleBlockUI(true);
    forkJoin({
      rooms,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: any) => {
          console.log('check room', repsonse);
          //Push categories to dropdown list
          var rooms = repsonse.rooms as RoomDto[];
          rooms.forEach((element) => {
            this.roomCategories.push({
              value: element.id,
              label: element.name,
            });
          });
          if (this.utilService.isEmpty(this.config.data?.id) == false) {
            this.loadFormDetails(this.config.data?.id);
          } else {
            this.toggleBlockUI(false);
          }
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  loadFormDetails(id: string) {
    console.log('id form detail', id);
    this.bookRoomApiClient
      .getRoomId(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: BookRoomsDto) => {
          this.selectedEntity = response;
          console.log('this selectEntity', this.selectedEntity);
          this.buildForm();
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
    console.log('first', this.form.value);
    this.toggleBlockUI(true);
    if (this.utilService.isEmpty(this.config.data?.id)) {
      this.bookRoomApiClient
        .createBookRoom(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.ref.close(this.form.value);
            this.toggleBlockUI(false);
          },
          error: () => {
            this.toggleBlockUI(false);
          },
        });
    } else {
      this.bookRoomApiClient
        .updateBookRoom(this.config.data?.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);

            this.ref.close(this.form.value);
          },
          error: () => {
            this.toggleBlockUI(false);
          },
        });
    }
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

  // roomId?: string;
  // dateCheckIn?: Date;
  // dateCheckout?: Date;
  // guestNumber?: number;
  // note?: string | undefined;
  buildForm() {
    this.form = this.fb.group({
      guestNumber: new FormControl(this.selectedEntity.guestNumber || null),
      note: new FormControl(this.selectedEntity.note || null),
      dateCheckIn: new FormControl(
        this.selectedEntity.dateCheckIn || Date,
        Validators.required
      ),
      roomId: new FormControl(
        this.selectedEntity.roomId || null,
        Validators.required
      ),
      dateCheckout: new FormControl(
        this.selectedEntity.dateCheckout || Date,
        Validators.required
      ),
    });
  }
}
