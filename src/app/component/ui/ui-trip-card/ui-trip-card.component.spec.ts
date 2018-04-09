import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTripCardComponent } from './ui-trip-card.component';

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

describe('UiTripCardComponent', () => {
    let component: UiTripCardComponent;
    let fixture: ComponentFixture<UiTripCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiTripCardComponent ]
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
        expect(arrive.querySelector('.time').innerHTML).toEqual(TEST_ARRIVE_TIME);
        expect(arrive.querySelector('.location-short').innerHTML).toEqual(TEST_ARRIVE_LOC);
    });
});
