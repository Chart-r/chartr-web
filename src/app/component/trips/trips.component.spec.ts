import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TripsComponent } from './trips.component';
import { TripService } from '../../service/trip.service';
import { TripServiceStub } from '../../testing/trip-service-stub';
import { UiTripCardComponent } from '../ui/ui-trip-card/ui-trip-card.component';

describe('TripsComponent', () => {
    let component: TripsComponent;
    let fixture: ComponentFixture<TripsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TripsComponent, UiTripCardComponent ],
            providers: [
                { provide: TripService, useClass: TripServiceStub }
            ]
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
        fixture.detectChanges();
        expect(component.trips.length).toBe(1);
        expect(component.trips[0].driver).toBe('1111');
    });
});
