import { TestBed } from '@angular/core/testing';

import { LazyPostsService } from './lazy-posts.service';

describe('LazyPostsService', () => {
  let service: LazyPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
