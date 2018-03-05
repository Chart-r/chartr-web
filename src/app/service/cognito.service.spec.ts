import { TestBed, inject } from '@angular/core/testing';

import { CognitoService } from './cognito.service';

describe('CognitoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CognitoService]
        });
    });

    it('should be created', inject([CognitoService], (service: CognitoService) => {
        expect(service).toBeTruthy();
    }));

    it('should return a valid user pool', inject([CognitoService], (service: CognitoService) => {
        const userPool = service.getUserPool();
        expect(userPool).toBeTruthy();
    }));

    it('should return a defined current user', inject([CognitoService], (service: CognitoService) => {
        const user = service.getCurrentUser();
        expect(user).toBeDefined();
    }));
});
