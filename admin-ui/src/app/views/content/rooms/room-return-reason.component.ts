import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AdminApiRoomApiClient } from 'src/app/api/admin-api.service.generated';
@Component({
    templateUrl: 'room-return-reason.component.html',
})
export class RoomReturnReasonComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();

    // Default
    public blockedPanelDetail: boolean = false;
    public form: FormGroup;
    public title: string;
    public btnDisabled = false;
    public saveBtnName: string;
    public contentTypes: any[] = [];

    formSavedEventEmitter: EventEmitter<any> = new EventEmitter();

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private roomApiClient: AdminApiRoomApiClient,
    ) { }

    ngOnDestroy(): void {
        if (this.ref) {
            this.ref.close();
        }
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    validationMessages = {
        reason: [{ type: 'required', message: 'Bạn phải nhập lý do' }],
    };

    ngOnInit() {
        //Init form
        this.buildForm();
    }

    saveChange() {
        this.toggleBlockUI(true);
        this.saveData();
    }

    private saveData() {
        this.toggleBlockUI(true);
        this.roomApiClient
            .returnBackSubmitRequest(this.config.data.id, this.form.value)
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
            reason: new FormControl(null, Validators.required)
        });

    }
}