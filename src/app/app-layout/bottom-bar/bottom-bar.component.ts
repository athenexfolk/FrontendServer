import { Component, Input } from '@angular/core';

@Component({
  selector: 'BottomBar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent {
  @Input() userStatus = false;
}
