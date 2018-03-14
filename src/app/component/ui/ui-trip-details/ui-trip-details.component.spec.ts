import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTripDetailsComponent } from './ui-trip-details.component';

const TEST_CLASS_NAME = 'col-4';
const TEST_SEATS = 10;
const TEST_SEATS_FILLED = 2;
const TEST_FEE = '$4.20';
const TEST_DEPART_TIME = 'TUESDAY, FEB 20, 2018 @ 3:15 PM';
const TEST_DEPART_LOC = 'Champaign, IL';
const TEST_ARRIVE_TIME = 'TUESDAY, FEB 20, 2018 @ 6:15 PM';
const TEST_ARRIVE_LOC = 'Chicago, IL';

describe('UiTripDetailsComponent', () => {
    let component: UiTripDetailsComponent;
    let fixture: ComponentFixture<UiTripDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiTripDetailsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiTripDetailsComponent);
        component = fixture.componentInstance;
        component.className = TEST_CLASS_NAME;
        component.seatsfilled = TEST_SEATS_FILLED;
        component.totalseats = TEST_SEATS;
        component.fee = TEST_FEE;
        component.departtime = TEST_DEPART_TIME;
        component.departdest = TEST_DEPART_LOC;
        component.arrivetime = TEST_ARRIVE_TIME;
        component.arrivedest = TEST_ARRIVE_LOC;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the trip-details class', () => {
        const card = fixture.debugElement.nativeElement.querySelector('div');
        expect(card.classList.contains('trip-details')).toEqual(true);
    });

    it('should accept a className', () => {
        const card = fixture.debugElement.nativeElement.querySelector('div');
        expect(card.classList.contains(TEST_CLASS_NAME)).toEqual(true);
    });

    it('should display seats available', () => {
        const seats = fixture.debugElement.nativeElement.querySelector('.trip-meta p');
        expect(seats.innerHTML).toEqual(`${TEST_SEATS - TEST_SEATS_FILLED}/${TEST_SEATS}`);
    });

    it('should display fee', () => {
        const fee = fixture.debugElement.nativeElement.querySelector('.price-meta p');
        expect(fee.innerHTML).toEqual(TEST_FEE);
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
