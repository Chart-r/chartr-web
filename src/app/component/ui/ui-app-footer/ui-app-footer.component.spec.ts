import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAppFooterComponent } from './ui-app-footer.component';

describe('UiAppFooterComponent', () => {
    let component: UiAppFooterComponent;
    let fixture: ComponentFixture<UiAppFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiAppFooterComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiAppFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
