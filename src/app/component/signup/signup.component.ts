import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { SignupService } from '../../service/signup.service';
import { NgForm } from '@angular/forms';

/** Class representing a SignupComponent */
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    /** The user being created */
    public user: User;
    /** The new user's password */
    public password: string;
    /** Error message displayed to user */
    public error: string;
    /** Flag indicating whether success message should be shown */
    public success = false;
    /** Flag indicating whether the sign up form is currently submitting */
    public submitting = false;

    /**
     * Create a SignupComponent
     * @param signUpService The sign up service
     */
    constructor(private signUpService: SignupService) { }

    /**
     * ngOnInit lifecycle hook for SignupComponent
     */
    ngOnInit() {
        this.user = new User();
    }

    /**
     * Submit a sign up form
     * @param signUpForm The sign up form to submit
     */
    onSubmit(signUpForm: NgForm) {
        this.submitting = true;

        if (signUpForm.form.valid) {
            const modifiedUser = new User();

            modifiedUser.email = this.user.email;
            modifiedUser.name = this.user.name;
            modifiedUser.phone = this.user.phone;

            const birthdate = this.user.birthdate;
            const birthdateParts = birthdate.split('/');
            modifiedUser.birthdate = `${birthdateParts[2]}-${birthdateParts[0]}-${birthdateParts[1]}`;

            this.signUpService.register(modifiedUser, this.password, (err, result) => {
                if (err) {
                    this.error = err;
                }
    
                else {
                    this.success = true;
                    this.error = null;
                    signUpForm.reset();
                }
    
                this.submitting = false;
            });
        }

        else {
            this.error = 'Please complete all fields correctly.';
            this.submitting = false;
        }
    }
}
