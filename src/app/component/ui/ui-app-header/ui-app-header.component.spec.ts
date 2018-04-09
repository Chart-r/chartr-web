import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAppHeaderComponent } from './ui-app-header.component';

describe('UiAppHeaderComponent', () => {
    let component: UiAppHeaderComponent;
    let fixture: ComponentFixture<UiAppHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiAppHeaderComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiAppHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
