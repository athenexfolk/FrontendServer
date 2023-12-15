import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyPostsService } from '../lazy-posts.service';
import { PostPreviewAndAuthor } from '../../core/models/post-and-author';

@Component({
  selector: 'app-lazy-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lazy-post.component.html',
  styleUrl: './lazy-post.component.scss',
})
export class LazyPostComponent implements OnInit {
  value: string = '';

  ppas: PostPreviewAndAuthor[] = [];

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private lazyPost: LazyPostsService
  ) {}

  ngOnInit(): void {
    this.adjustTextareaHeight();

    this.lazyPost.posts$.subscribe((ppas) => (this.ppas = ppas));
    this.loadMore();
  }

  adjustTextareaHeight() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        console.log('req');

        const textarea =
          this.elementRef.nativeElement.querySelector('textarea');
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });
  }

  loadMore() {
    console.log('clicked');

    this.lazyPost.loadMore({
      zeroLengthHandler: () => {
        console.log('zero');
      },
      completeCallback: () => {
        console.log('complete');
      },
    });
  }
}
