import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {

  @ViewChild("main") mainElement!: ElementRef;

  loginForm = this.fb.group({
    username: '',
    password: ''
  });

  constructor(private auth: AuthService, private fb: FormBuilder){}

  onSubmit(): void {
    this.auth.login(this.loginForm.value.username!, this.loginForm.value.password!)
    this.loginForm.reset();
  }
  
  ngAfterViewInit(): void {    
      let main = this.mainElement.nativeElement as HTMLElement
      main.scrollIntoView({behavior:'smooth',block: 'start'})
  }
}
