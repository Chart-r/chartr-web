import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { FormsModule, NgForm } from '@angular/forms';
import { CognitoService } from '../../service/cognito.service';
import { LoginServiceStub } from '../../testing/login-service-stub';
import { UiMessageComponent } from '../ui/ui-message/ui-message.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService: LoginServiceStub;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ LoginComponent, UiMessageComponent ],
            providers: [
                { provide: LoginService, useClass: LoginServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        loginService = TestBed.get(LoginService);
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should redirect to home on login success', () => {
        const mockForm = {
            form: { valid: true }
        } as NgForm;
        
        routerSpy.navigateByUrl.and.callFake(url => {
            expect(url).toBe('/home');
        });
        
        component.onSubmit(mockForm);
        
        expect(routerSpy.navigateByUrl.calls.count()).toBe(1);
    });

    it('should not redirect on login failure', () => {
        const mockForm = {
            form: { valid: true }
        } as NgForm;

        loginService.authenticateShouldFail = true;
        
        routerSpy.navigateByUrl.and.callFake(url => {
            fail('redirect should not happen');
        });
        
        component.onSubmit(mockForm);
        
        expect(routerSpy.navigateByUrl.calls.count()).toBe(0);
        expect(component.submitting).toBeFalsy();
    });

    it('should display error message if form is invalid', () => {
        const mockForm = {
            form: { valid: false }
        } as NgForm;
        
        component.onSubmit(mockForm);
        
        expect(component.error).toBe('Please complete all fields.');
        expect(component.submitting).toBeFalsy();
    });
});
