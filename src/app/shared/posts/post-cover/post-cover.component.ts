import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../cover/cover.component';
import { PostDataService } from '../../../core/services/post-data.service';

@Component({
  selector: 'app-post-cover',
  standalone: true,
  imports: [CommonModule, CoverComponent],
  templateUrl: './post-cover.component.html',
  styleUrl: './post-cover.component.scss',
})
export class PostCoverComponent implements OnInit {
  @Input() coverImageSrc? = '';
  coverImage?: File;
  @Output() coverImageSrcChange = new EventEmitter<string | undefined>();
  @Output() coverImageChange = new EventEmitter<File | undefined>();

  @Input() isEditable = false;

  constructor(private postDataService: PostDataService) {}

  ngOnInit() {
    this.postDataService.coverImageSrc = this.coverImageSrc;
  }

  clearCoverImage() {
    this.coverImageSrcChange.emit(undefined);
    this.coverImageChange.emit(undefined);
    this.postDataService.coverImageSrc = undefined;
    this.postDataService.coverImage = undefined;
  }

  onCoverImageChange(e: Event) {
    let el = e.target as HTMLInputElement;
    this.coverImage = el.files![0];
    const coverSrc = URL.createObjectURL(this.coverImage!);
    this.coverImageSrcChange.emit(coverSrc);
    this.coverImageChange.emit(this.coverImage);
    this.postDataService.coverImageSrc = coverSrc;
    this.postDataService.coverImage = this.coverImage;
  }
}
