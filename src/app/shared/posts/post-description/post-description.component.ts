import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDataService } from '../../../core/services/post-data.service';

@Component({
  selector: 'app-post-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
})
export class PostDescriptionComponent implements OnInit {
  @Input() description = '';
  @Output() descriptionChange = new EventEmitter<string>();

  @Input() isEditable = false;

  constructor(private postDataService: PostDataService) {}

  ngOnInit() {
    this.postDataService.description = this.description;
  }

  onInputDescription(e: Event) {
    const description = (e.target as HTMLDivElement).textContent || '';
    this.descriptionChange.emit(description);
    this.postDataService.description = description;
  }
}
