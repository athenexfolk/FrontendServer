import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() isMobile = false
  @Output() routeChangeEmitter = new EventEmitter()

  onRouteChange() {
    this.routeChangeEmitter.emit()
  }
}
