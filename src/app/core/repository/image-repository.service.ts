import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageResponse } from '../models/image-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageRepositoryService {
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData) {
    return this.http.post<ImageResponse>(`/api/img/v1/img`, formData);
  }

  getImage(formData: FormData) {
    return this.uploadImage(formData).pipe(map((response) => response.img));
  }
}
