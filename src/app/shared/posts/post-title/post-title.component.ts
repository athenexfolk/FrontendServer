import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDataService } from '../../../core/services/post-data.service';

@Component({
  selector: 'app-post-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-title.component.html',
  styleUrl: './post-title.component.scss',
})
export class PostTitleComponent implements OnInit {
  @Input() title = '';
  @Output() titleChange = new EventEmitter<string>();

  @Input() isEditable = false;

  constructor(private postDataService: PostDataService) {}

  ngOnInit() {
    this.postDataService.title = this.title;
  }


  onInputTitle(e: Event) {
    const title = (e.target as HTMLDivElement).textContent || '';
    this.titleChange.emit(title);
    this.postDataService.title = title;
  }
}
