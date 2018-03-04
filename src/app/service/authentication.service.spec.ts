import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { CognitoService } from './cognito.service';
import { CognitoUser } from 'amazon-cognito-identity-js';

describe('AuthenticationService', () => {
    let cognitoServiceSpy: jasmine.SpyObj<CognitoService>;

    beforeEach(() => {
        cognitoServiceSpy = jasmine.createSpyObj('CognitoService', ['getCurrentUser']);

        TestBed.configureTestingModule({
            providers: [ 
                AuthenticationService,
                { provide: CognitoService, useValue: cognitoServiceSpy }
            ]
        });
    });

    it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));

    it('should return authenticated user', inject([AuthenticationService], (service: AuthenticationService) => {
        const mockUser = {
            getSession: cb => {
                let mockSession = {
                    isValid: () => true
                };

                cb(null, mockSession);
            }
        };

        cognitoServiceSpy.getCurrentUser.and.returnValue(mockUser);

        service.getAuthenticatedUser((err, user) => {
            expect(err).toBeNull();
            expect(user).toBeTruthy();
        })
    }));

    it('should return null for invalid session', inject([AuthenticationService], (service: AuthenticationService) => {
        const mockUser = {
            getSession: cb => {
                let mockSession = {
                    isValid: () => false
                };

                cb(null, mockSession);
            }
        };

        cognitoServiceSpy.getCurrentUser.and.returnValue(mockUser);

        service.getAuthenticatedUser((err, user) => {
            expect(err).toBeNull();
            expect(user).toBeNull();
        })
    }));

    it('should return error message on get user failure', inject([AuthenticationService], (service: AuthenticationService) => {
        const errorMessage = 'simulated failure';
        const mockUser = {
            getSession: cb => {
                cb({ message: errorMessage }, null);
            }
        };

        cognitoServiceSpy.getCurrentUser.and.returnValue(mockUser);

        service.getAuthenticatedUser((err, user) => {
            expect(err).toBe(errorMessage);
            expect(user).toBeNull();
        })
    }));

    it('should return null if there is no current user', inject([AuthenticationService], (service: AuthenticationService) => {
        cognitoServiceSpy.getCurrentUser.and.returnValue(null);

        service.getAuthenticatedUser((err, user) => {
            expect(err).toBeNull();
            expect(user).toBeNull();
        })
    }));

    it('should get user attributes', inject([AuthenticationService], (service: AuthenticationService) => {
        const mockUser = {
            getUserAttributes: cb => {
                const result = [];
                result.push({ getName: () => 'email', getValue: () => 'test@user.com' });
                result.push({ getName: () => 'name', getValue: () => 'Test User' });
                result.push({ getName: () => 'birthdate', getValue: () => '1996-01-01' });
                result.push({ getName: () => 'phone_number', getValue: () => '+19999999999' });

                cb(null, result);
            }
        } as CognitoUser;

        service.getUserAttributes(mockUser, (err, user) => {
            expect(user.email).toBe('test@user.com');
            expect(user.name).toBe('Test User');
            expect(user.birthdate).toBe('1996-01-01');
            expect(user.phone).toBe('+19999999999');
        });
    }));

    it('should return error message on get attributes failure', inject([AuthenticationService], (service: AuthenticationService) => {
        const errorMessage = 'simulated failure';
        const mockUser = {
            getUserAttributes: cb => {
                cb({ message: errorMessage } as Error, null);
            }
        } as CognitoUser;

        service.getUserAttributes(mockUser, (err, user) => {
            expect(err).toBe(errorMessage);
            expect(user).toBeNull();
        });
    }));
});
