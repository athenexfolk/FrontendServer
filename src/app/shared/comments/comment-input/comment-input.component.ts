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
import { UserInformationService } from '../../../core/services/user-information.service';
import { DisplayName } from '../../../core/models/profile';

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
  me!: DisplayName;

  data = '';

  constructor(
    private commentService: CommentService,
    private userInformationService: UserInformationService,
    private authorityService: AuthorityService
  ) {}

  ngOnInit(): void {
    this.userInformationService
      .getDisplayName([this.authorityService.user_id!])
      .subscribe((user) => (this.me = user[0]!));
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
