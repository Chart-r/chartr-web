import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';

@Component({
    selector: 'app-ui-app-footer',
    templateUrl: './ui-app-footer.component.html',
    styleUrls: ['./ui-app-footer.component.css']
})
export class UiAppFooterComponent implements OnInit {
    @Input() user: User;

    constructor() { }

    ngOnInit() { }

}
