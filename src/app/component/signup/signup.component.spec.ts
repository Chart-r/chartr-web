import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupService } from '../../service/signup.service';
import { CognitoService } from '../../service/cognito.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ SignupComponent ],
            providers: [
                SignupService,
                CognitoService,
                { provide: Router, useClass: RouterStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
