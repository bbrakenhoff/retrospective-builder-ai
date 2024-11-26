import { TestBed } from '@angular/core/testing';

import { RetrospectiveElementService } from './retrospective-element.service';

describe('RetrospectiveElementService', () => {
  let service: RetrospectiveElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrospectiveElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
