import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupService } from '../../service/signup.service';
import { CognitoService } from '../../service/cognito.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { SignupServiceStub } from '../../testing/signup-service-stub';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let signupService: SignupServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ SignupComponent ],
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

        component.onSubmit(mockForm);

        fixture.detectChanges();

        expect(component.error).toBe('Please complete all fields correctly.');
        expect(component.submitting).toBeFalsy();
    });
});
