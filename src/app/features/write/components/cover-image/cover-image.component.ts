import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'CoverImage',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss'],
})
export class CoverImageComponent {
  @Input() image: string = '';
  @Output() imageChange = new EventEmitter<string>()

  isCoverImageValid = false;

  onFileUpload(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0]);
    fileReader.onload = () => {
      this.image = fileReader.result!.toString();
      this.imageChange.emit(this.image)
      this.isCoverImageValid = true;
    };
  }
  removeImage() {
    this.image = '';
    this.imageChange.emit(this.image)
    this.isCoverImageValid = false;
  }
}
