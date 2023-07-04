import { Component } from '@angular/core';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss']
})
export class CoverImageComponent {
  image: string = ''
  isCoverImageValid = false

  onFileUpload(e: Event){
    let input = e.target as HTMLInputElement
    if(!input.files?.item(0))
      return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0])
    fileReader.onload = () => {
      this.image = fileReader.result!.toString();
      this.isCoverImageValid = true
    }
  }
}
