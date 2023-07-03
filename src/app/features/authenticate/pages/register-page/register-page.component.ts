import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  @ViewChild("main") mainElement!: ElementRef;
  
  ngAfterViewInit(): void {    
      let main = this.mainElement.nativeElement as HTMLElement
      main.scrollIntoView({behavior:'smooth',block: 'start'})
  }
}
