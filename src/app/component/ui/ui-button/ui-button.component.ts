import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-button',
    templateUrl: './ui-button.component.html',
    styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent implements OnInit {
    @Input() className: string = '';
    @Input() onClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    clicked(event: any) {
        this.onClick.emit(event);
    }
}
