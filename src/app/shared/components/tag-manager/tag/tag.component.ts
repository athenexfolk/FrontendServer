import { Component, Input } from '@angular/core';

@Component({
  selector: 'Tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() name = "BLANK_TAG"
  @Input() color = "3f3f46"
  @Input() disabled = false

  getContrastingColor(background: string): string {
    // return "#000000"
    const hex = background.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? "#000000" : "#FFFFFF";
  }
}
