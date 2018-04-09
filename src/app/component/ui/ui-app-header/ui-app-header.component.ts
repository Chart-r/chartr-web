import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';

@Component({
    selector: 'app-ui-app-header',
    templateUrl: './ui-app-header.component.html',
    styleUrls: ['./ui-app-header.component.css']
})
export class UiAppHeaderComponent implements OnInit {
    @Input() user: User;

    constructor() { }

    ngOnInit() { }

}
