import { Component } from '@angular/core';
import { RegisterService } from '../../service/register.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerForm = this.fb.group({
    username: '',
    password: '',
    confirmPassword: '',
  });

  nullState = true;
  isPasswordLengthValid = false;
  isPasswordRequiresNonAlphanumeric = false;
  isPasswordMatched = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    console.log('pass1');

    if (
      !(
        this.isPasswordLengthValid &&
        this.isPasswordRequiresNonAlphanumeric &&
        this.isPasswordMatched
      )
    )
      return;

    console.log('pass');

    this.registerService
      .passwordFlow(
        this.registerForm.value.username!,
        this.registerForm.value.password!
      )
      .subscribe({
        error: (err) => {
          console.log(err.error[0].description);
          if (err.error[0].code === 'PasswordRequiresNonAlphanumeric') {
            this.isPasswordRequiresNonAlphanumeric = false;
          } else if (err.error[0].code === '') {
          } else {
          }
        },
        complete: () => {
          this.registerForm.reset();
          this.router.navigate(['/auth/login']);
        },
      });
  }

  checkValidation() {
    this.checkPasswordLength();
    this.checkNonAlphanumeric();
    this.checkPasswordMatch();
  }

  checkPasswordLength() {
    if (this.registerForm.value.password) {
      this.isPasswordLengthValid = this.registerForm.value.password.length >= 8;
    }
  }

  checkNonAlphanumeric() {
    if (this.registerForm.value.password) {
      this.isPasswordRequiresNonAlphanumeric =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&;])[A-Za-z\d@$!%*?&;]+$/.test(
          this.registerForm.value.password
        );
    }
  }

  checkPasswordMatch() {
    if (this.registerForm.value.password && this.registerForm.value.password) {
      this.isPasswordMatched =
        this.registerForm.value.password ===
        this.registerForm.value.confirmPassword;
    }
  }
}
