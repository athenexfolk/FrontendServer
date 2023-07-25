import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    // let obsv$ = this.route.params.pipe(
    //   switchMap(params => {
    //     const id = params['postId'];
    //     return this.postService.getSinglePostById(id);
    //   })
    // );
  }
}
