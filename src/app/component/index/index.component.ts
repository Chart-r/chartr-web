import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    public user: User = null;
    
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

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
