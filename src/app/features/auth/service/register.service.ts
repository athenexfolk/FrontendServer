import { Injectable } from '@angular/core';
import { PasswordService } from 'src/app/core/auth/password.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private passwordFlowLogin : PasswordService,
  ) { }


  passwordFlow(username : string, password : string){
    return this.passwordFlowLogin.register(username, password);
  }
}
