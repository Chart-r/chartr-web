import { TestBed, inject } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { CognitoService } from './cognito.service';
import { User } from '../model/user';

describe('SignupService', () => {
    let cognitoServiceSpy: jasmine.SpyObj<CognitoService>;
    let user: User;

    beforeEach(() => {
        cognitoServiceSpy = jasmine.createSpyObj('CognitoService', ['getUserPool']);
        user = new User();
        user.name = 'Test User';
        user.email = 'test@user.com';
        user.birthdate = '1996-01-01';
        user.phone = '+19999999999';

        TestBed.configureTestingModule({
            providers: [
                SignupService,
                { provide: CognitoService, useValue: cognitoServiceSpy }
            ]
        });
    });

    it('should be created', inject([SignupService], (service: SignupService) => {
        expect(service).toBeTruthy();
    }));

    it('should register valid user', inject([SignupService], (service: SignupService) => {
        cognitoServiceSpy.getUserPool.and.returnValue({
            signUp: (email, password, attributes, validation, cb) => {
                expect(attributes.length).toBe(4);
                cb(null, 'simulated success');
            }
        });

        service.register(user, 'password', (err, result) => {
            expect(err).toBeNull();
            expect(result).toBeDefined();
        });
    }));

    it('should return error message on failure', inject([SignupService], (service: SignupService) => {
        const simulatedError = 'simulated failure';

        cognitoServiceSpy.getUserPool.and.returnValue({
            signUp: (email, password, attributes, validation, cb) => {
                cb({ message: simulatedError }, null);
            }
        });

        service.register(user, 'password', (err, result) => {
            expect(err).toBe(simulatedError);
            expect(result).toBeNull();
        });
    }));
});
