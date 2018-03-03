import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthenticationService } from '../../service/authentication.service';
import { LoginService } from '../../service/login.service';
import { CognitoService } from '../../service/cognito.service';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LogoutComponent ],
            providers: [
                AuthenticationService,
                LoginService,
                CognitoService
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
});
