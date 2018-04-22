import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { SignupService } from '../../service/signup.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public user: User;
    public password: string;
    public error: string;
    public success = false;
    public submitting = false;

    constructor(private signUpService: SignupService) { }

    ngOnInit() {
        this.user = new User();
    }

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
