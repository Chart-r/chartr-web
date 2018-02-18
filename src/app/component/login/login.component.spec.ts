import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { FormsModule } from '@angular/forms';
import { CognitoService } from '../../service/cognito.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ LoginComponent ],
            providers: [
                LoginService,
                CognitoService,
                { provide: Router, useClass: RouterStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
