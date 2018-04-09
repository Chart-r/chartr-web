import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTripComponent } from './post-trip.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthenticationServiceStub } from '../../testing/authentication-service-stub';
import { AuthenticationService } from '../../service/authentication.service';
import { TripService } from '../../service/trip.service';
import { TripServiceStub } from '../../testing/trip-service-stub';
import { UiMessageComponent } from '../ui/ui-message/ui-message.component';
import { UiAppFooterComponent } from '../ui/ui-app-footer/ui-app-footer.component';
import { UiAppHeaderComponent } from '../ui/ui-app-header/ui-app-header.component';

describe('PostTripComponent', () => {
    let component: PostTripComponent;
    let fixture: ComponentFixture<PostTripComponent>;
    let routerSpy: jasmine.SpyObj<Router>;
    let authenticationService: AuthenticationServiceStub;
    let tripService: TripServiceStub;

    beforeEach(async(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        TestBed.configureTestingModule({
            imports: [ 
                FormsModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyAWckaSoMi4tF4ZO8ontykqEGjWi-yn7ng',
                    libraries: ['places']
                }),
                CalendarModule,
                BrowserAnimationsModule
            ],
            declarations: [ PostTripComponent, UiMessageComponent, UiAppFooterComponent, UiAppHeaderComponent ],
            providers: [
                { provide: TripService, useClass: TripServiceStub },
                { provide: AuthenticationService, useClass: AuthenticationServiceStub },
                { provide: Router, useValue: routerSpy }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        authenticationService = TestBed.get(AuthenticationService);
        tripService = TestBed.get(TripService);
        fixture = TestBed.createComponent(PostTripComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display post trip form', () => {
        fixture.detectChanges();
        const h1: HTMLElement = fixture.nativeElement.querySelector('.full-height-content h1');
        expect(h1.textContent).toBe('Post Trip');
    });

    it('should display error message for invalid forms', () => {
        const mockForm = {
            form: { valid: false },
            reset: () => null
        } as NgForm;

        fixture.detectChanges();

        component.trip.startLat = 1;
        component.trip.startLong = 1;
        component.trip.endLat = 1;
        component.trip.endLong = 1;
        expect(component.trip.validLocations()).toBeTruthy();

        component.onSubmit(mockForm);
        fixture.detectChanges();

        expect(component.error).toBe('Please complete all fields.');
        expect(component.success).toBeNull();
        expect(component.submitting).toBeFalsy();
    });

    it('should display error message for invalid locations', () => {
        const mockForm = {
            form: { valid: true },
            reset: () => null
        } as NgForm;

        fixture.detectChanges();
        component.onSubmit(mockForm);
        fixture.detectChanges();

        expect(component.trip.validLocations()).toBeFalsy();
        expect(component.error).toBe('Please complete all fields.');
        expect(component.success).toBeNull();
        expect(component.submitting).toBeFalsy();
    });

    it('should display success message and clear form on success', () => {
        const mockForm = {
            form: { valid: true },
            reset: () => null
        } as NgForm;

        fixture.detectChanges();

        component.trip.startLat = 1;
        component.trip.startLong = 1;
        component.trip.endLat = 1;
        component.trip.endLong = 1;

        component.onSubmit(mockForm);

        expect(component.error).toBeNull();
        expect(component.success).toBe('Successfully created trip.');
        expect(component.submitting).toBeFalsy();
    });

    it('should display error message on server failure', () => {
        const mockForm = {
            form: { valid: true },
            reset: () => null
        } as NgForm;

        tripService.shouldFail = true;

        fixture.detectChanges();

        component.trip.startLat = 1;
        component.trip.startLong = 1;
        component.trip.endLat = 1;
        component.trip.endLong = 1;

        component.onSubmit(mockForm);

        expect(component.error).toBe('Error creating trip. Please try again.');
        expect(component.success).toBeNull();
        expect(component.submitting).toBeFalsy();
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
