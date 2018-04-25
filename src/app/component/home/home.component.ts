import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';

/** Class representing the HomeComponent */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    /** The logged in user */
    public user: User = null;

    /**
     * Create a HomeComponent
     * @param authenticationService The authentication service
     * @param router The Angular router
     */
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    /**
     * ngOnInit lifecycle hook for HomeComponent.
     * This function checks that a user is logged in.
     */
    ngOnInit() {
        this.authenticationService.getAuthenticatedUser((err, cognitoUser) => {
            if (err) {
                console.error(err);
                this.router.navigateByUrl('/');
            }

            else if (cognitoUser) {
                this.authenticationService.getUserAttributes(cognitoUser, (err, user) => {
                    if (err) {
                        console.error(err);
                        this.router.navigateByUrl('/');
                    }

                    else {
                        this.user = user;
                    }
                });
            }

            else {
                this.router.navigateByUrl('/');
            }
        });
    }

}
