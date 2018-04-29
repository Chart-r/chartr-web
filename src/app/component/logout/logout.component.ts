import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { AuthenticationService } from '../../service/authentication.service';

/** Class representing a LogoutComponent */
@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    /**
     * Create a LogoutComponent
     * @param authenticationService The authentication service
     * @param loginService The login service
     */
    constructor(private authenticationService: AuthenticationService, private loginService: LoginService) { }

    /**
     * ngOnInit lifecycle hook for LogoutComponent.
     * This function logs a user out.
     */
    ngOnInit() {
        this.authenticationService.clearAuthenticatedUser();
        this.loginService.logout();
    }
}
