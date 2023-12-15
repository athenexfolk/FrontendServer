import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDataService } from '../../../core/services/post-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-description',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './post-description.component.html',
  styleUrl: './post-description.component.scss',
})
export class PostDescriptionComponent implements OnInit {
  @Input() description = '';
  @Output() descriptionChange = new EventEmitter<string>();

  @Input() isEditable = false;

  constructor(
    private postDataService: PostDataService,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.postDataService.description = this.description;
  }

  onInputDescription(e: Event) {
    const description = (e.target as HTMLDivElement).textContent || '';
    this.descriptionChange.emit(description);
    this.postDataService.description = description;
  }

  adjustTextareaHeight() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const textarea =
          this.elementRef.nativeElement.querySelector('textarea');
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });

    this.descriptionChange.emit(this.description);
    this.postDataService.description = this.description;
  }
}
