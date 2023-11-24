import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
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
    // private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    if (
      !(
        this.isPasswordLengthValid &&
        this.isPasswordRequiresNonAlphanumeric &&
        this.isPasswordMatched
      )
    )
      return;

    // this.registerService
    //   .passwordFlow(
    //     this.registerForm.value.username!,
    //     this.registerForm.value.password!
    //   )
    //   .subscribe({
    //     error: (err) => {
    //       console.log(err.error[0].description);
    //       if (err.error[0].code === 'PasswordRequiresNonAlphanumeric') {
    //         this.isPasswordRequiresNonAlphanumeric = false;
    //       } else if (err.error[0].code === '') {
    //       } else {
    //       }
    //     },
    //     complete: () => {
    //       this.registerForm.reset();
    //       this.router.navigate(['/auth/login']);
    //     },
    //   });
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
