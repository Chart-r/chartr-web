import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonComponent } from './ui-button.component';


const TEST_CLASS_NAME = 'mytestbtnclass';

describe('UiButtonComponent', () => {
    let component: UiButtonComponent;
    let fixture: ComponentFixture<UiButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UiButtonComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UiButtonComponent);
        component = fixture.componentInstance;
        component.className = TEST_CLASS_NAME;
        spyOn(component.onClick, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trigger click', fakeAsync(() => {
        const btn = fixture.debugElement.nativeElement.querySelector('button');
        btn.click();
        tick();
        expect(component.onClick.emit).toHaveBeenCalled();
    }));

    it('should have the btn class', () => {
        const btn = fixture.debugElement.nativeElement.querySelector('button');
        expect(btn.classList.contains('btn')).toEqual(true);
    });

    it('should accept a className', () => {
        const btn = fixture.debugElement.nativeElement.querySelector('button');
        expect(btn.classList.contains(TEST_CLASS_NAME)).toEqual(true);
    });
});
