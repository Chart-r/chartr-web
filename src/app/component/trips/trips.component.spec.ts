import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TripsComponent } from './trips.component';
import { TripService } from '../../service/trip.service';

describe('TripsComponent', () => {
    let component: TripsComponent;
    let fixture: ComponentFixture<TripsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            declarations: [ TripsComponent ],
            providers: [TripService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TripsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
