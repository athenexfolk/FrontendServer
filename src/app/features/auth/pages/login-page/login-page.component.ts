import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    username: '',
    password: '',
  });

  isShowMsg = false;
  isLoginFailed = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    this.loginService
      .passwordFlow(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      )
      .subscribe({
        error: () => {
          this.isShowMsg = true;
          this.isLoginFailed = true;
        },
        complete: () => {
          this.loginForm.reset();
          this.router.navigate(['/']);
        },
      });
  }

  github() {
    this.loginService.githubFlow();
  }

  resetState() {
    if (this.isLoginFailed) {
      this.isShowMsg = false;
      this.isLoginFailed = false;
    }
  }
}
