import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import {
  AdminApiCommentsApiClient,
  AdminApiRoomApiClient,
  CommentDto,
  RoomDto,
} from './../../../api/admin-api.service.generated';
import { UtilityService } from '../../../shared/services/utility.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  templateUrl: 'comment-detail.component.html',
})
export class CommentDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public btnDisabedName = true;

  public saveBtnName: string;
  public closeBtnName: string;
  public roomCategories: any[] = [];
  public authorUserName: string;
  selectedEntity = {} as CommentDto;
  public selectedRoom: any[] = [];
  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private commentService: AdminApiCommentsApiClient,
    private roomService: AdminApiRoomApiClient,
    private utilService: UtilityService,
    private fb: FormBuilder,
    private tokenService: TokenStorageService
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    // console.log('oninit');
    this.buildForm();

    // load data to form

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
          //   console.log('room', this.roomCategories);
          //   console.log('id', this.config.data?.id);
          if (this.utilService.isEmpty(this.config.data?.id) == false) {
            this.loadDetail(this.config.data.id);
            this.saveBtnName = 'Cập nhật';
            this.closeBtnName = 'Hủy';
          } else {
            this.authorUserName = this.tokenService.getUser().firstName;
            console.log(this.authorUserName);
            this.saveBtnName = 'Thêm';
            this.closeBtnName = 'Đóng';
          }
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  // Validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validationMessages = {
    name: [
      { type: 'required', message: 'Bạn phải nhập tên' },
      { type: 'minlength', message: 'Bạn phải nhập ít nhất 3 kí tự' },
      { type: 'maxlength', message: 'Bạn không được nhập quá 255 kí tự' },
    ],
  };

  loadDetail(id: any) {
    // console.log("first",id)
    this.toggleBlockUI(true);
    this.commentService
      .getCommentById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: CommentDto) => {
          this.selectedEntity = response;
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
    if (this.utilService.isEmpty(this.config.data?.id)) {
      this.commentService
        .createComment(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.ref.close(this.form.value);
          this.toggleBlockUI(false);
        });
    } else {
      //   console.log('this.config.data.id', this.config.data.id);
      this.commentService
        .updateComment(this.config.data.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.toggleBlockUI(false);
          this.ref.close(this.form.value);
        });
    }
  }

  buildForm() {
    // console.log("buildform")
    this.form = this.fb.group({
      roomId: new FormControl(
        this.selectedEntity.roomId || null,
        Validators.required
      ),
      authorUserName: new FormControl(
        this.selectedEntity.authorUserName || null,
        Validators.required
      ),
      dateCreated: new FormControl(
        this.selectedEntity.dateCreated || new Date(),
        Validators.required
      ),
      content: new FormControl(this.selectedEntity.content || null),
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
