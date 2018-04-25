import { Component, EventEmitter, Input, OnInit } from '@angular/core';

/** Class representing a Chartr button */
@Component({
    selector: 'app-ui-button',
    templateUrl: './ui-button.component.html',
    styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent implements OnInit {
    /** The CSS class name to be applied to the button */
    @Input() className: string;
    /** The onClick event handler */
    @Input() onClick: EventEmitter<any> = new EventEmitter<any>();

    /** Create a Chartr button */
    constructor() { }

    /** ngOnInit lifecycle hook for the Chartr button */
    ngOnInit() {
    }

    /** Handle button click event */
    clicked(event: any) {
        this.onClick.emit(event);
    }
}
