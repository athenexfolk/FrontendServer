import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  navLinks = [
    {
      route: "write",
      name: "เขียนบทความ",
      disable: false
    },
    {
      route: "community",
      name: "แหล่งชุมชน",
      disable: true
    }
  ]

  @Input() isMobile = false
  @Output() routeChangeEmitter = new EventEmitter()

  onRouteChange() {
    this.routeChangeEmitter.emit()
  }
}
