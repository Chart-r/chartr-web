import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TripsComponent } from './trips.component';
import { TripService } from '../../service/trip.service';
import { TripServiceStub } from '../../testing/trip-service-stub';
import { GeoService } from '../../service/geo.service';
import { GeoServiceStub } from '../../testing/geo-service-stub';

describe('TripsComponent', () => {
    let component: TripsComponent;
    let fixture: ComponentFixture<TripsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TripsComponent ],
            providers: [
                { provide: TripService, useClass: TripServiceStub }
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TripsComponent);
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
        expect(component.postedTrips.length).toBe(1);
    });
});
