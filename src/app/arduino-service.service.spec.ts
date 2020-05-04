import { TestBed } from '@angular/core/testing';

import { ArduinoServiceService } from './arduino-service.service';

describe('ArduinoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArduinoServiceService = TestBed.get(ArduinoServiceService);
    expect(service).toBeTruthy();
  });
});
