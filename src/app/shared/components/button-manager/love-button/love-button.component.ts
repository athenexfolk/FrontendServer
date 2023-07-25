import { Component, Input } from '@angular/core';

@Component({
  selector: 'LoveButton',
  templateUrl: './love-button.component.html',
  styleUrls: ['./love-button.component.scss']
})
export class LoveButtonComponent {
  @Input() isLoved = false
  
  toggleLove() {
    this.isLoved = !this.isLoved
  }
}
