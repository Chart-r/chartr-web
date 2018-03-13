import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTripComponent } from './post-trip.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostTripComponent', () => {
    let component: PostTripComponent;
    let fixture: ComponentFixture<PostTripComponent>;

    beforeEach(async(() => {
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
            declarations: [ PostTripComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostTripComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
