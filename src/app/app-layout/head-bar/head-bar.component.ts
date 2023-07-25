import { Component, Input } from '@angular/core';

@Component({
  selector: 'HeadBar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent {
  @Input() userStatus = false
}
