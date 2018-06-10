import { TestBed, inject } from '@angular/core/testing';

import { SlackApiService } from './slack-api.service';

describe('SlackApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlackApiService]
    });
  });

  it('should be created', inject([SlackApiService], (service: SlackApiService) => {
    expect(service).toBeTruthy();
  }));
});
