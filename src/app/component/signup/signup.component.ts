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
    public user = new User();
    public password: string;
    public error: string;
    public success = false;
    public submitting = false;

    constructor(private signUpService: SignupService, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(signUpForm: NgForm) {
        this.submitting = true;

        if (signUpForm.form.valid) {
            this.signUpService.register(this.user, this.password, (err, result) => {
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
            this.error = 'Please complete all fields.';
            this.submitting = false;
        }
    }
}
