import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { SignupService } from '../../service/signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public user = new User();
    public password: string;
    public error: string;

    constructor(private signUpService: SignupService, private router: Router) { }

    ngOnInit() {
    }

    onSubmit() {
        this.signUpService.register(this.user, this.password, (err, result) => {
            if (err) {
                this.error = err;
            }

            else {
                this.router.navigateByUrl('/');
            }
        });
    }

}
