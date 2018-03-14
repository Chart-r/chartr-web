import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-ui-message',
	templateUrl: './ui-message.component.html',
	styleUrls: ['./ui-message.component.css']
})
export class UiMessageComponent implements OnInit {
	@Input() className: string = '';

	constructor() { }

	ngOnInit() {
	}

}
