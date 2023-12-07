import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { UserService } from '../../../core/services/user.service';
import { AuthorityService } from '../../../core/auth/authority.service';
import { User } from '../../../core/models/user';
import { CommentService } from '../../../core/services/comment.service';
import { CommentAndOwner } from '../../../core/models/comment';
import { switchMap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss',
})
export class CommentInputComponent implements OnInit {
  @Input({ required: true }) forPostId = '';
  @Output() addComment = new EventEmitter<CommentAndOwner>();
  me!: User;

  data = '';

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private authorityService: AuthorityService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser(this.authorityService.user_id!)
      .subscribe((user) => (this.me = user!));
  }

  sendComment() {
    this.commentService
      .addCommentToPost(this.forPostId, {
        data: this.data,
      })
      .pipe(
        switchMap((res) =>
          this.commentService.mapCommentAndOwner(res, res.commentOwnerId)
        )
      )
      .subscribe((res) => {
        this.addComment.emit(res);
        this.data = '';
      });
  }
}
