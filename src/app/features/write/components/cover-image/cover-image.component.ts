import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'CoverImage',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss'],
})
export class CoverImageComponent implements OnChanges {
  @Input() image!: string;
  @Output() imageChange = new EventEmitter<string>();

  isCoverImageValid = false;

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['image'] && !changes['image'].firstChange) {
        this.isCoverImageValid = true
      }
  }

  constructor(private postService: PostService) {}

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let file = input.files[0];
    let formData = new FormData();
    formData.append('img', file);

    this.postService.uploadImage(formData).subscribe({
      next: (data) =>
        this.imageChange.emit(
          '/api/img/v1/img/' + data.img
        ),
      complete: () => (this.isCoverImageValid = true),
    });
  }
  removeImage() {
    this.image = '';
    this.imageChange.emit(this.image);
    this.isCoverImageValid = false;
  }
}
