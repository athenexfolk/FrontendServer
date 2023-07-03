import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit {

  @ViewChild("main") mainElement!: ElementRef;
  
  ngAfterViewInit(): void {    
      let main = this.mainElement.nativeElement as HTMLElement
      main.scrollIntoView({behavior:'smooth',block: 'start'})
  }
}
