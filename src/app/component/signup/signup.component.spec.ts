import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupService } from '../../service/signup.service';
import { CognitoService } from '../../service/cognito.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { SignupServiceStub } from '../../testing/signup-service-stub';
import { UiMessageComponent } from '../ui/ui-message/ui-message.component';
import { UiAppFooterComponent } from '../ui/ui-app-footer/ui-app-footer.component';
import { UiAppHeaderComponent } from '../ui/ui-app-header/ui-app-header.component';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let signupService: SignupServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ SignupComponent, UiMessageComponent, UiAppFooterComponent, UiAppHeaderComponent ],
            providers: [
                { provide: SignupService, useClass: SignupServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        signupService = TestBed.get(SignupService);
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display success message and clear form on success', () => {
        const mockForm = {
            form: { valid: true },
            reset: () => null
        } as NgForm;

        fixture.detectChanges();
        component.onSubmit(mockForm);
        fixture.detectChanges();

        expect(component.success).toBeTruthy();
        expect(component.error).toBeNull();
        expect(component.submitting).toBeFalsy();
    });

    it('should display error message on failure', () => {
        const mockForm = {
            form: { valid: true },
            reset: () => null
        } as NgForm;

        signupService.signUpShouldFail = true;

        fixture.detectChanges();
        component.onSubmit(mockForm);
        fixture.detectChanges();

        expect(component.error).toBe('simulated failure');
        expect(component.submitting).toBeFalsy();
    });

    it('should display error message for invalid forms', () => {
        const mockForm = {
            form: { valid: false },
            reset: () => null
        } as NgForm;

        fixture.detectChanges();
        component.onSubmit(mockForm);
        fixture.detectChanges();

        expect(component.error).toBe('Please complete all fields correctly.');
        expect(component.submitting).toBeFalsy();
    });
});
