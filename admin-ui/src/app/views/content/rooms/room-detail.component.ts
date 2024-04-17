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
import { UtilityService } from 'src/app/shared/services/utility.service';
import {
  AdminApiRoomApiClient,
  AdminApiCategoryApiClient,
  RoomCategoryDto,
  RoomDto,
  AdminApiLocationApiClient,
  LocationDto,
} from 'src/app/api/admin-api.service.generated';
import { UploadService } from 'src/app/shared/services/upload.service';
import { environment } from 'src/environments/environment';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  templateUrl: 'room-detail.component.html',
})
export class RoomDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public roomCategories: any[] = [];
  public arrLocations: any[] = [];
  public contentTypes: any[] = [];
  public series: any[] = [];
  selectedEntity = {} as RoomDto;
  public thumbnailImage;
  tags: string[] | undefined;
  filteredTags: string[] | undefined;
  roomTags: string[];
  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();
  public booleanValue: boolean;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilityService,
    private fb: FormBuilder,
    private roomApiClient: AdminApiRoomApiClient,
    private roomCategoryApiClient: AdminApiCategoryApiClient,
    private uploadService: UploadService,
    private locationApiClient: AdminApiLocationApiClient
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
  public generateSlug() {
    var slug = this.utilService.makeSeoTitle(this.form.get('name').value);
    this.form.controls['slug'].setValue(slug);
  }
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
    var categories = this.roomCategoryApiClient.getAllRoomCategory();
    var tags = this.roomApiClient.getAllTags();
    var locations = this.locationApiClient.getAllLocation();
    this.toggleBlockUI(true);
    forkJoin({
      categories,
      tags,
      locations,
    })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (repsonse: any) => {
          //Push categories to dropdown list
          this.tags = repsonse.tags as string[];
          var categories = repsonse.categories as RoomCategoryDto[];
          categories.forEach((element) => {
            this.roomCategories.push({
              value: element.id,
              label: element.name,
            });
          });
          var locations = repsonse.locations as LocationDto[];
          locations.forEach((element) => {
            this.arrLocations.push({
              value: element.id,
              label: element.name,
            });
          });
          // console.log(this.config.data.id)
          if (this.utilService.isEmpty(this.config.data?.id) == false) {
            this.roomApiClient
              .getRoomTags(this.config.data?.id)
              .subscribe((res) => {
                this.roomTags = res;
                this.loadFormDetails(this.config.data?.id);
              });
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
    // console.log('id form detail', id);
    this.roomApiClient
      .getRoomId(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: RoomDto) => {
          this.selectedEntity = response;
          // console.log('this selectEntity', this.selectedEntity);
          this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.uploadService.uploadImage('rooms', event.target.files).subscribe({
        next: (response: any) => {
          this.form.controls['photo'].setValue(response.path);
          this.thumbnailImage = environment.API_URL + response.path;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  saveChange() {
    this.toggleBlockUI(true);
    this.saveData();
  }

  private saveData() {
    console.log('first', this.form.value);
    this.toggleBlockUI(true);
    if (this.utilService.isEmpty(this.config.data?.id)) {
      this.roomApiClient
        .createRoom(this.form.value)
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
      this.roomApiClient
        .updateRoom(this.config.data?.id, this.form.value)
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
  buildForm() {
    this.form = this.fb.group({
      name: new FormControl(
        this.selectedEntity.name || null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3),
        ])
      ),
      slug: new FormControl(
        this.selectedEntity.slug || null,
        Validators.required
      ),
      guest: new FormControl(this.selectedEntity.guest || null),
      description: new FormControl(
        this.selectedEntity.description || null,
        Validators.required
      ),
      seoDescription: new FormControl(
        this.selectedEntity.seoDescription || null
      ),
      categoryId: new FormControl(
        this.selectedEntity.categoryId || null,
        Validators.required
      ),
      locateId: new FormControl(
        this.selectedEntity.locateId || null,
        Validators.required
      ),
      bedRoom: new FormControl(this.selectedEntity.bedRoom || null),
      bathRoom: new FormControl(this.selectedEntity.bathRoom || null),
      price: new FormControl(this.selectedEntity.price || null),
      washMachine: new FormControl(this.selectedEntity.washMachine || false),
      ironCloth: new FormControl(this.selectedEntity.ironCloth || false),
      kitchen: new FormControl(this.selectedEntity.kitchen || false),
      airCondirioner: new FormControl(
        this.selectedEntity.airCondirioner || false
      ),
      wifi: new FormControl(this.selectedEntity.wifi || false),
      televison: new FormControl(this.selectedEntity.televison || false),
      pool: new FormControl(this.selectedEntity.pool || false),
      park: new FormControl(this.selectedEntity.park || false),
      tags: new FormControl(this.roomTags),
      photo: new FormControl(this.selectedEntity.photo || null),
    });
    if (this.selectedEntity.photo) {
      this.thumbnailImage = environment.API_URL + this.selectedEntity.photo;
      console.log('thumbnailImage,', this.thumbnailImage);
    }
  }
  filterTag(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;
    // console.log('query tag', query);
    for (let i = 0; i < (this.tags as any[]).length; i++) {
      let tag = (this.tags as string[])[i];
      if (tag.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    if (filtered.length == 0) {
      filtered.push(query);
    }

    this.filteredTags = filtered;
  }
}
