import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import {
  AdminApiTypesApiClient,
  TypeRoom,
} from '../../../api/admin-api.service.generated';
import { UtilityService } from '../../../shared/services/utility.service';
import { UploadService } from '../../../shared/services/upload.service';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: 'type-room-detail.component.html',
})
export class TypeRoomDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public closeBtnName: string;
  selectedEntity = {} as TypeRoom;
  public photoImage;

  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private typeRoomService: AdminApiTypesApiClient,
    private utilService: UtilityService,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public generateSlug() {
    var slug = this.utilService.makeSeoTitle(this.form.get('name')!.value);
    this.form.controls['slug'].setValue(slug);
  }
  ngOnInit() {
    this.buildForm();
    if (this.utilService.isEmpty(this.config.data?.id) == false) {
      this.loadDetail(this.config.data.id);
      this.saveBtnName = 'Cập nhật';
      this.closeBtnName = 'Hủy';
    } else {
      this.saveBtnName = 'Thêm';
      this.closeBtnName = 'Đóng';
    }
  }
  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    typeName: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'minlength', message: 'Bạn phải nhập ít nhất 3 kí tự' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
    slug: [{ type: 'required', message: 'Bạn phải nhập mã duy nhất' }],
  };

  loadDetail(id: any) {
    this.toggleBlockUI(true);
    this.typeRoomService
      .getTypeRoomById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: TypeRoom) => {
          this.selectedEntity = response;
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
      this.uploadService.uploadImage('types', event.target.files).subscribe({
        next: (response: any) => {
          this.form.controls['image'].setValue(response.path);
          this.photoImage = environment.API_URL + response.path;
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
    if (this.utilService.isEmpty(this.config.data?.id)) {
      this.typeRoomService
        .createTypeRoom(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.ref.close(this.form.value);
          this.toggleBlockUI(false);
        });
    } else {
      this.typeRoomService
        .updateTypeRoom(this.config.data.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.toggleBlockUI(false);
          this.ref.close(this.form.value);
        });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      typeName: new FormControl(
        this.selectedEntity.typeName || null,
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
      image: new FormControl(
        this.selectedEntity.image || null,
        Validators.required
      ),
      isActive: new FormControl(this.selectedEntity.isActive || true),
    });
    if (this.selectedEntity.image) {
      this.photoImage = environment.API_URL + this.selectedEntity.image;
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
}
