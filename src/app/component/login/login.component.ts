import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { NgForm } from '@angular/forms';

/** Class representing the LoginComponent */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    /** The email entered in the login form */
    public email: string;
    /** The password entered in the login form */
    public password: string;
    /** Error message displayed to the user */
    public error = '';
    /** Flag indicating whether the login form is currently submitting */
    public submitting = false;

    /**
     * Create a LoginComponent
     * @param loginService The login service
     * @param router The Angular router
     */
    constructor(private loginService: LoginService, private router: Router) { }

    /**
     * ngOnInit lifecycle hook for LoginComponent
     */
    ngOnInit() {
    }

    /**
     * Submit the login form
     * @param loginForm The login form to submit
     */
    onSubmit(loginForm: NgForm): void {
        this.submitting = true;

        if (loginForm.form.valid) {
            this.loginService.authenticate(this.email, this.password, (err, result) => {
                if (err) {
                    this.error = err;
                }
    
                else {
                    this.router.navigateByUrl('/home');
                }
    
                this.submitting = false;
            });
        }

        else {
            this.error = 'Please complete all fields.';
            this.submitting = false;
        }
    }
}
