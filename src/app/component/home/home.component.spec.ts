import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthenticationService } from '../../service/authentication.service';
import { CognitoService } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';



describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeComponent ],
            providers: [ 
                AuthenticationService, 
                CognitoService, 
                { provide: Router, useClass: RouterStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
