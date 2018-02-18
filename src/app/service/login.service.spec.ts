import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { CognitoService } from './cognito.service';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                CognitoService
            ]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
