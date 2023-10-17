import { TestBed } from '@angular/core/testing';

import { PublicEndpointSwitcherInterceptor } from './public-endpoint-switcher.interceptor';

describe('PublicEndpointSwitcherInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PublicEndpointSwitcherInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PublicEndpointSwitcherInterceptor = TestBed.inject(PublicEndpointSwitcherInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
