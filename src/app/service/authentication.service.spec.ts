import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { CognitoService } from './cognito.service';

describe('AuthenticationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ 
                AuthenticationService,
                CognitoService
            ]
        });
    });

    it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));
});
