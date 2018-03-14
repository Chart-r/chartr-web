import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMessageComponent } from './ui-message.component';

const TEST_CLASS_NAME = 'error';

describe('UiMessageComponent', () => {
    let component: UiMessageComponent;
    let fixture: ComponentFixture<UiMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiMessageComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiMessageComponent);
        component = fixture.componentInstance;
         component.className = TEST_CLASS_NAME;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the message class', () => {
        const message = fixture.debugElement.nativeElement.querySelector('div');
        expect(message.classList.contains('message')).toEqual(true);
    });

    it('should accept a className', () => {
        const message = fixture.debugElement.nativeElement.querySelector('div');
        expect(message.classList.contains(TEST_CLASS_NAME)).toEqual(true);
    });
});
