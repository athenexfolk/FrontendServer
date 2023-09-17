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
import { AuthorityService } from 'src/app/core/auth/authority.service';
import { CommentAndOwner } from 'src/app/core/models/comment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  loginStatus: boolean = false;
  pa!: PostAndAuthor;
  editor!: EditorJS;

  mockComments:CommentAndOwner[] = [
    {
      comment: {
        _id: "123",
        commentOwnerId: "123",
        postId: "123",
        data: "I think it's excellent",
        replyToId: "123",
        timestamp: new Date(),
      },
      owner: {
        id: "123",
        avatar: "",
        isFollower: false,
        isFollowing: false,
        username: "Jane",
      }
    },
    {
      comment: {
        _id: "124",
        commentOwnerId: "123",
        postId: "123",
        data: "I think it's aggressive",
        replyToId: "123",
        timestamp: new Date(),
      },
      owner: {
        id: "123",
        avatar: "",
        isFollower: false,
        isFollowing: false,
        username: "Jane",
      }
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthorityService
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

    this.authService.isLoggedin$.subscribe((r) => (this.loginStatus = r));
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
