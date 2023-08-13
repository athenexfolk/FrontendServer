import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'OptionsMenu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent {
  @Input() postId: string = '';
  isPanelOpened = false;

  constructor(private postService: PostService, private router: Router) {}

  openPanel() {
    this.isPanelOpened = true;
  }
  closePanel() {
    this.isPanelOpened = false;
  }

  updateThisPost() {
    this.router.navigate(['/', 'write', 'edit', this.postId]);
  }

  deleteThisPost() {
    this.postService.deletePost(this.postId).subscribe({ complete: () => {} });
  }
}
