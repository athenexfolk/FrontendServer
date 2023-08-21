import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { PostAndAuthor } from 'src/app/core/models/post-and-author';
import { PostService } from 'src/app/core/services/post.service';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  pa!: PostAndAuthor;

  editor!: EditorJS;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  checkImage(imageString: string) {
    if (!imageString.length) return 'assets/images/default-image.svg';
    return imageString;
  }

  ngOnInit(): void {
    let obsv$ = this.route.params.pipe(
      switchMap((params) => {
        const id = params['postId'];
        return this.postService.getSinglePostById(id);
      })
    );
    obsv$.subscribe({
      next: (pa) => {
        this.pa = pa;
        this.initializeEditorJS();
      },
    });
  }

  initializeEditorJS(): void {
    if (this.pa && this.pa.post && this.pa.post.content) {
      this.editor = new EditorJS({
        holder: 'reader',
        readOnly: true,
        tools: {
          header: Header,
          delimiter: Delimiter,
          table: Table,
          inlineCode: InlineCode,
          nestedList: NestedList,
        },
        data: JSON.parse(this.pa.post.content),
      });
    }
  }
}
