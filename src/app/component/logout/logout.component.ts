import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService, private loginService: LoginService) { }

    ngOnInit() {
        this.authenticationService.user = null;
        this.loginService.logout();
    }
}
