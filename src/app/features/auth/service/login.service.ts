import { Injectable } from '@angular/core';
import { GithubService } from 'src/app/core/auth/github.service';
import { PasswordService } from 'src/app/core/auth/password.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private passwordFlowLogin : PasswordService,
    private githubFlowLogin : GithubService
  ) { }


  passwordFlow(username : string, password : string){
    return this.passwordFlowLogin.login(username, password);
  }

  githubFlow(){
    return this.githubFlowLogin.login();
  }

}
