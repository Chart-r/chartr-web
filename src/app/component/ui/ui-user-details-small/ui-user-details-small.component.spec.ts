import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserDetailsSmallComponent } from './ui-user-details-small.component';

const TEST_DRIVER_NAME = 'NiceDriver123';
const TEST_DRIVER_AVATAR = 'testimage.png';
const TEST_RATING = '5.00';

describe('UiUserDetailsSmallComponent', () => {
    let component: UiUserDetailsSmallComponent;
    let fixture: ComponentFixture<UiUserDetailsSmallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiUserDetailsSmallComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiUserDetailsSmallComponent);
        component = fixture.componentInstance;
        component.driverName = TEST_DRIVER_NAME;
        component.rating = TEST_RATING;
        component.avatar = TEST_DRIVER_AVATAR;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept a driver name', () => {
        let drivername = fixture.debugElement.nativeElement.querySelector('.user-meta p');
        expect(drivername.innerHTML).toEqual(TEST_DRIVER_NAME);
    });

    it('should accept a driver avatar', () => {
        let avatar = fixture.debugElement.nativeElement.querySelector('.user-meta .avatar');
        expect(avatar.src).toContain(TEST_DRIVER_AVATAR);
    });

    it('should accept a rating', () => {
        let rating = fixture.debugElement.nativeElement.querySelector('.user-meta .rating');
        expect(rating.innerHTML).toEqual(TEST_RATING);
    });
});
