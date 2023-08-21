import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthorityService } from './core/auth/authority.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'beta-blog';
  isLargeScreen!: boolean;
  isLoggedIn!: boolean;

  private breakpointObserver: BreakpointObserver;

  constructor(private bpo: BreakpointObserver, private auth: AuthorityService) {

    this.breakpointObserver = bpo;

    this.auth.isLoggedin$.subscribe((res) => {
      this.isLoggedIn = res;
      console.log(this.isLoggedIn);
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe('(min-width: 768px)').subscribe((state) => {
      this.isLargeScreen = state.matches;
    });
  }
}
