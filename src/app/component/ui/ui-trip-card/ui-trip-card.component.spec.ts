import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTripCardComponent } from './ui-trip-card.component';
import { UserService } from '../../../service/user.service';
import { UserServiceStub } from '../../../testing/user-service-stub';
import { Trip } from '../../../model/trip';
import { User } from '../../../model/user';

const TEST_CLASS_NAME = 'col-4';
const TEST_DRIVER_NAME = 'NiceDriver123';
const TEST_DRIVER_AVATAR = 'testimage.png';
const TEST_RATING = '5.00';
const TEST_SEATS = 10;
const TEST_SEATS_FILLED = 2;
const TEST_DEPART_TIME = 'Fri, Apr 27, 2018, 3:28 PM';
const TEST_DEPART_LOC = 'Champaign, IL';
const TEST_ARRIVE_TIME = 'Wed, Dec 31, 1969, 6:00 PM';
const TEST_ARRIVE_LOC = 'Chicago, IL';
const TEST_TRIP_ID = '1';

describe('UiTripCardComponent', () => {
    let component: UiTripCardComponent;
    let fixture: ComponentFixture<UiTripCardComponent>;
    const mockParent = {
        otherTrips: [ { tripId: '1' }, { tripId: '2' }, { tripId: '3' } ],
        pendingTrips: []
    };

    const mockTrip = {
        tripId: '1'
    } as Trip;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiTripCardComponent ],
            providers: [
                { provide: UserService, useClass: UserServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiTripCardComponent);
        component = fixture.componentInstance;
        component.className = TEST_CLASS_NAME;
        component.driverName = TEST_DRIVER_NAME;
        component.rating = TEST_RATING;
        component.seatsfilled = TEST_SEATS_FILLED;
        component.totalseats = TEST_SEATS;
        component.departtime = new Date(TEST_DEPART_TIME);
        component.departdest = TEST_DEPART_LOC;
        component.arrivetime = new Date(TEST_ARRIVE_TIME);
        component.arrivedest = TEST_ARRIVE_LOC;
        component.avatar = TEST_DRIVER_AVATAR;
        component.tripId = TEST_TRIP_ID;
        component.trip = mockTrip;
        component.parent = mockParent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the trip-card class', () => {
        const card = fixture.debugElement.nativeElement.querySelector('div');
        expect(card.classList.contains('trip-card')).toEqual(true);
    });

    it('should accept a className', () => {
        const card = fixture.debugElement.nativeElement.querySelector('div');
        expect(card.classList.contains(TEST_CLASS_NAME)).toEqual(true);
    });

    it('should accept a driver name', () => {
        const drivername = fixture.debugElement.nativeElement.querySelector('.user-meta p');
        expect(drivername.innerHTML).toEqual(TEST_DRIVER_NAME);
    });

    it('should accept a driver avatar', () => {
        const avatar = fixture.debugElement.nativeElement.querySelector('.user-meta .avatar');
        expect(avatar.src).toContain(TEST_DRIVER_AVATAR);
    });

    it('should accept a rating', () => {
        const rating = fixture.debugElement.nativeElement.querySelector('.user-meta .rating');
        expect(rating.innerHTML).toEqual(TEST_RATING);
    });

    it('should display seats remaining', () => {
        const seatsremaining = fixture.debugElement.nativeElement.querySelector('.trip-meta p');
        expect(seatsremaining.innerHTML).toEqual(`${TEST_SEATS_FILLED}/${TEST_SEATS}`);
    });

    it('should display trip details', () => {
        const depart = fixture.debugElement.nativeElement.querySelector('.route .depart');
        const arrive = fixture.debugElement.nativeElement.querySelector('.route .arrive');
        expect(depart.querySelector('.time').innerHTML).toEqual(TEST_DEPART_TIME);
        expect(depart.querySelector('.location-short').innerHTML).toEqual(TEST_DEPART_LOC);
        expect(arrive.querySelector('.location-short').innerHTML).toEqual(TEST_ARRIVE_LOC);
    });

    it('should send request to join trip', () => {
        component.requestToJoinTrip();
        fixture.detectChanges();
        
        expect(component.parent.otherTrips.length).toBe(2);
        expect(component.parent.pendingTrips.length).toBe(1);
        expect(component.parent.pendingTrips[0].tripId).toBe('1');
    });

    it('should accept a rider on a trip with space', () => {
        component.interestedRiders = [ { uid: '1' }, { uid: '2'}, { uid: '3' } ] as User[];
        component.acceptRider('1');
        fixture.detectChanges();

        expect(component.seatsfilled).toBe(3);
        expect(component.interestedRiders.length).toBe(2);
    });

    it('should not accept a rider on a full trip', () => {
        component.interestedRiders = [ { uid: '1' }, { uid: '2'}, { uid: '3' } ] as User[];
        component.seatsfilled = TEST_SEATS;
        component.acceptRider('1');
        fixture.detectChanges();

        expect(component.seatsfilled).toBe(TEST_SEATS);
        expect(component.interestedRiders.length).toBe(3);
    });

    it('should reject a rider', () => {
        component.interestedRiders = [ { uid: '1' }, { uid: '2'}, { uid: '3' } ] as User[];
        component.rejectRider('1');
        fixture.detectChanges();

        expect(component.seatsfilled).toBe(2);
        expect(component.interestedRiders.length).toBe(2);
    });
});
