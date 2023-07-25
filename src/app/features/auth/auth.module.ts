import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { KeyComponent } from './components/key/key.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { GithubComponent } from './components/github/github.component';
import { GoogleComponent } from './components/google/google.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    UserComponent,
    KeyComponent,
    FacebookComponent,
    GithubComponent,
    GoogleComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
