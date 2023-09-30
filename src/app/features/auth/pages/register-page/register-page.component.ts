import { Component } from '@angular/core';
import { RegisterService } from '../../service/register.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm = this.fb.group({
    username: '',
    password: '',
    confirmPassword: '',
  });

  isShowMsg = false;
  isPasswordNotMatch = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword) {this.isPasswordNotMatch = true;return}
    this.registerService.passwordFlow(this.registerForm.value.username!, this.registerForm.value.password!)
      .subscribe({
        error: (err) => {this.isShowMsg = true; console.log(err.error[0].description)},
        complete: () => {
          this.registerForm.reset();
          this.router.navigate(['/auth/login'])
        }
      });
  }
}
