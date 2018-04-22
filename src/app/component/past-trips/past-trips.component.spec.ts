import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PastTripsComponent } from './past-trips.component';
import { AuthenticationService } from '../../service/authentication.service';
import { CognitoService } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { AuthenticationServiceStub } from '../../testing/authentication-service-stub';
import { TripsComponent } from '../trips/trips.component';
import { UiAppFooterComponent } from '../ui/ui-app-footer/ui-app-footer.component';
import { UiAppHeaderComponent } from '../ui/ui-app-header/ui-app-header.component';
import { TripService } from '../../service/trip.service';
import { GeoService } from '../../service/geo.service';
import { GeoServiceStub } from '../../testing/geo-service-stub';
import { TripServiceStub } from '../../testing/trip-service-stub';


describe('PastTripsComponent', () => {
    let component: PastTripsComponent;
    let fixture: ComponentFixture<PastTripsComponent>;
    let routerSpy: jasmine.SpyObj<Router>;
    let authenticationService: AuthenticationServiceStub;

    beforeEach(async(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            declarations: [ PastTripsComponent, TripsComponent, UiAppFooterComponent, UiAppHeaderComponent ],
            providers: [ 
                { provide: AuthenticationService, useClass: AuthenticationServiceStub }, 
                { provide: Router, useValue: routerSpy },
                { provide: TripService, useClass: TripServiceStub },
                { provide: GeoService, useClass: GeoServiceStub }
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        authenticationService = TestBed.get(AuthenticationService);
        fixture = TestBed.createComponent(PastTripsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display past trips', () => {
        fixture.detectChanges();
        expect(component.trips.length).toBe(1);
    });

    it('should redirect if user attributes cannot be fetched', () => {
        routerSpy.navigateByUrl.and.callFake(url => {
            expect(url).toBe('/');
        });
        authenticationService.getAttributesShouldFail = true;
        fixture.detectChanges();
        expect(routerSpy.navigateByUrl.calls.count()).toBe(1);
    });

    it('should redirect if user cannot be fetched', () => {
        routerSpy.navigateByUrl.and.callFake(url => {
            expect(url).toBe('/');
        });
        authenticationService.getUserShouldFail = true;
        fixture.detectChanges();
        expect(routerSpy.navigateByUrl.calls.count()).toBe(1);
    });

    it('should redirect if no user is logged in', () => {
        routerSpy.navigateByUrl.and.callFake(url => {
            expect(url).toBe('/');
        });
        authenticationService.isLoggedIn = false;
        fixture.detectChanges();
        expect(routerSpy.navigateByUrl.calls.count()).toBe(1);
    });
});
