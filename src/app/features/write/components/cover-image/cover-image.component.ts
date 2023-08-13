import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'CoverImage',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss'],
})
export class CoverImageComponent {
  @Input() image: string = '';
  @Output() imageChange = new EventEmitter<string>();

  isCoverImageValid = false;

  constructor(private postService: PostService) {}

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let file = input.files[0];
    let formData = new FormData();
    formData.append('img', file);

    this.postService.upload(formData).subscribe({
      next: (data) =>
        this.imageChange.emit(
          'https://p.villsource.tk/api/img/v1/img/' + data.img
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
