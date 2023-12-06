import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../core/models/tag';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent implements OnInit {
  @Input({ required: true }) tag!: Tag;

  bgColor = '';
  textColor = '';

  ngOnInit(): void {
    this.bgColor = this.tag.color.startsWith('#')
      ? this.tag.color
      : '#' + this.tag.color;
    this.textColor = this.getContrastingColor();
  }

  getContrastingColor(): string {
    const hex = this.tag.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? '#000000' : '#FFFFFF';
  }
}
