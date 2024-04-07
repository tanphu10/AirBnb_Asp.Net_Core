import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AdminApiAuthApiClient,
  AuthenticatedResult,
  LoginRequest,
} from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UrlConstants } from 'src/app/shared/constants/url.contants';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  private ngUnsubcribe = new Subject<void>();
  loading=false;
  constructor(
    private fb: FormBuilder,
    private authApiClient: AdminApiAuthApiClient,
    private alertService: AlertService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  login() {
    this.loading=true;
    var request: LoginRequest = new LoginRequest({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    });

    this.authApiClient
      .login(request)
      .pipe(takeUntil(this.ngUnsubcribe))
      .subscribe({
        next: (res: AuthenticatedResult) => {
          // save token and refresh token to localstorage

          //  chỉnh sửa phần tsconfig.json strict : false
          this.tokenService.saveToken(res.token);
          this.tokenService.saveRefreshToken(res.refreshToken);
          this.tokenService.saveUser(res);
          this.router.navigate([UrlConstants.HOME]);
        },
        error: (error: any) => {
          console.log(error);
          this.alertService.showError('đăng nhập không đúng');
          this.loading=false;
        },
      });
  }
}
