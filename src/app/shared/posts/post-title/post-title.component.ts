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
  selector: 'app-post-title',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './post-title.component.html',
  styleUrl: './post-title.component.scss',
})
export class PostTitleComponent implements OnInit {
  @Input() title = '';
  @Output() titleChange = new EventEmitter<string>();

  @Input() isEditable = false;

  constructor(
    private postDataService: PostDataService,
    private ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.postDataService.title = this.title;
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

    this.titleChange.emit(this.title);
    this.postDataService.title = this.title;
  }
}
