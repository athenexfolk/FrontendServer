import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { PostAndAuthor } from 'src/app/core/models/post-and-author';
import { PostService } from 'src/app/core/services/post.service';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';
import { AuthorityService } from 'src/app/core/auth/authority.service';
import { CommentAndOwner } from 'src/app/core/models/comment';
import CodeBlock, { CodeBlockConfig } from 'src/app/core/tools/code-block';
import { CodeModel } from 'src/app/core/tools/code-model';
import { CommentService } from 'src/app/core/services/comment.service';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  loginStatus: boolean = false;
  pa!: PostAndAuthor;
  editor!: EditorJS;

  code: CodeModel | null = null;
  isShowCodePage: boolean = true;

  comments$!: Observable<CommentAndOwner[]>;

  postId = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthorityService,
    private commentService: CommentService,
    private tagService: TagService
  ) {}

  checkImage(imageString: string) {
    if (!imageString.length) return 'assets/images/default-image.svg';
    return imageString;
  }

  ngOnInit(): void {
    let obsv$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.postId = params.get('postId') || '';

        if (this.authService.isLoggedin && this.postId.length) {
          this.comments$ = this.commentService.getAllCommentsInPost(
            this.postId
          );
        }
        return this.postService.getSinglePostById(this.postId);
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
    let codeBlockConfig: CodeBlockConfig = {
      name: 'code-block',
      event: this.getCodeData,
    };

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
          codeBlock: {
            class: CodeBlock as any,
            config: codeBlockConfig,
          },
        },
        onReady: () => {
          if (this.pa.post.content.length)
            this.editor.render(JSON.parse(this.pa.post.content));
        },
      });
    }
  }

  getCodeData = (code: CodeModel) => {
    this.openCodePage();
    this.code = code;
  };

  openCodePage() {
    this.isShowCodePage = true;
  }

  closeCodePage() {
    this.isShowCodePage = false;
  }

  getTagColor(tagName: string) {
    return this.tagService.getColorFromTagName(tagName);
  }
}
