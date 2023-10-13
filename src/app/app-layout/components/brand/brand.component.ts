import { Component, Input } from '@angular/core';

@Component({
  selector: 'Brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  @Input() text = ""
}
