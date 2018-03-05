import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthenticationService } from '../../service/authentication.service';
import { LoginService } from '../../service/login.service';
import { CognitoService } from '../../service/cognito.service';

describe('LogoutComponent', () => {
    let component: LogoutComponent;
    let fixture: ComponentFixture<LogoutComponent>;
    let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
    let loginServiceSpy: jasmine.SpyObj<LoginService>;

    beforeEach(async(() => {
        authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['clearAuthenticatedUser']);
        loginServiceSpy = jasmine.createSpyObj('LoginService', ['logout']);

        TestBed.configureTestingModule({
            declarations: [ LogoutComponent ],
            providers: [
                { provide: AuthenticationService, useValue: authenticationServiceSpy },
                { provide: LoginService, useValue: loginServiceSpy }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call clearAuthenticatedUser and logout', () => {
        fixture.detectChanges();
        expect(authenticationServiceSpy.clearAuthenticatedUser.calls.count()).toBe(1);
        expect(loginServiceSpy.logout.calls.count()).toBe(1);
    });
});
