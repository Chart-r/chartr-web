import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAppFooterComponent } from '../ui/ui-app-footer/ui-app-footer.component';
import { UiAppHeaderComponent } from '../ui/ui-app-header/ui-app-header.component';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
    let component: IndexComponent;
    let fixture: ComponentFixture<IndexComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ IndexComponent, UiAppFooterComponent, UiAppHeaderComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display Chartr header', () => {
        fixture.detectChanges();
        const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
        expect(h1.textContent).toBe('Chartr');
    });
});
