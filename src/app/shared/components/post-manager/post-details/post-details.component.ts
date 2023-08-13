import { Component, Input } from '@angular/core';

@Component({
  selector: 'PostDetails',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {
  @Input() createdTime!: Date
  @Input() lastUpdatedTime!: Date
}
