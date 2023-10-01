import { Injectable } from '@angular/core';
import { CommentRepositoryService } from '../repository/comment-repository.service';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs';
import { Comment, CommentAndOwner, CommentRequest } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private commentRepo: CommentRepositoryService,
    private userService: UserService
  ) {}

  getAllCommentsInPost(postId: string) {
    return this.commentRepo.getCommentsByPostId(postId).pipe(
      switchMap((response) => {
        const comments = response;
        const ownerIds = comments.map((comment) => comment.commentOwnerId);

        return this.mapCommentsAndOwners(comments, ownerIds);
      })
    );
  }

  mapCommentsAndOwners(comments: Comment[], ownerIds: string[]) {
    return this.userService.getUsers(ownerIds).pipe(
      map((owners) =>
        comments.map(
          (comment) =>
            ({
              comment: comment,
              owner: owners.find(
                (owner) => owner.id === comment.commentOwnerId
              ),
            } as CommentAndOwner)
        )
      )
    );
  }

  getCommentByIdInPost(postId: string, commentId: string) {
    return this.commentRepo.getCommentByPostId(postId, commentId).pipe(
      switchMap((response) => {
        const comment = response;
        const ownerId = comment.commentOwnerId;
        return this.mapCommentAndOwner(comment, ownerId);
      })
    );
  }

  mapCommentAndOwner(comment: Comment, ownerId: string) {
    return this.userService
      .getUser(ownerId)
      .pipe(
        map((owner) => ({ comment: comment, owner: owner } as CommentAndOwner))
      );
  }

  addCommentToPost(postId: string, comment: CommentRequest) {
    return this.commentRepo.addCommentToPostId(postId, comment);
  }

  editCommentInPost(postId: string, comment: CommentRequest) {
    return this.commentRepo.editCommentInPostId(postId, comment);
  }

  deleteCommentInPost(postId: string, commentId: string) {
    return this.commentRepo.deleteCommentInPostId(postId, commentId);
  }
}
