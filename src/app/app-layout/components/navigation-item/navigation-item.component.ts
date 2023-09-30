import { Component, Input } from '@angular/core';

@Component({
  selector: 'NavigationItem',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() path = ""
  @Input() name = ""
}
