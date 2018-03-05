import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public error = '';
    public submitting = false;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {
    }

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
