import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyTripsComponent } from './my-trips.component';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/router-stubs';
import { TripService } from '../../service/trip.service';
import { TripServiceStub } from '../../testing/trip-service-stub';
import { GeoService } from '../../service/geo.service';
import { GeoServiceStub } from '../../testing/geo-service-stub';
import { AuthenticationService } from '../../service/authentication.service';
import { AuthenticationServiceStub } from '../../testing/authentication-service-stub';

import { UiAppFooterComponent } from '../ui/ui-app-footer/ui-app-footer.component';
import { UiAppHeaderComponent } from '../ui/ui-app-header/ui-app-header.component';

describe('MyTripsComponent', () => {
    let component: MyTripsComponent;
    let fixture: ComponentFixture<MyTripsComponent>;
    let routerSpy: jasmine.SpyObj<Router>;
    let authenticationService: AuthenticationServiceStub;

    beforeEach(async(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            declarations: [ MyTripsComponent, UiAppFooterComponent, UiAppHeaderComponent ],
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
        fixture = TestBed.createComponent(MyTripsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load trips', () => {
        const mockUser = {
            email: 'test@user.com',
            name: 'Test User',
            birthdate: '1996-01-01',
            phone: '+19999999999',
            uid: '1111'
        };

        component.user = mockUser;

        fixture.detectChanges();
        expect(component.allTrips.length).toBe(1);
        expect(component.allTrips[0].driver).toBe('1111');
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
