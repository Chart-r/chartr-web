import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';

/** Class representing the IndexComponent */
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    /** The logged in user */
    public user: User = null;
    
    /**
     * Create an IndexComponent
     * @param authenticationService The authentication service
     * @param router The Angular router
     */
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    /**
     * ngOnInit lifecycle hook for IndexComponent.
     * This function checks if a user is logged in and redirects accordingly.
     */
    ngOnInit() {
        this.authenticationService.getAuthenticatedUser((err, cognitoUser) => {
            if (err) {
                console.error(err);
            }

            else if (cognitoUser) {
                this.authenticationService.getUserAttributes(cognitoUser, (err, user) => {
                    if (err) {
                        console.error(err);
                    }

                    else {
                        this.user = user;
                        this.router.navigateByUrl('/home');
                    }
                });
            }
        });
    }

}
