import { TestBed, inject } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { CognitoService } from './cognito.service';

describe('SignupService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SignupService,
                CognitoService
            ]
        });
    });

    it('should be created', inject([SignupService], (service: SignupService) => {
        expect(service).toBeTruthy();
    }));
});
