import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public error = '';

    constructor(private loginService: LoginService) { }

    ngOnInit() {
    }

    onSubmit(): void {
        this.loginService.authenticate(this.email, this.password, (err, result) => {
            if (err) {
                this.error = err;
            }

            else {
                alert('Login successful!');
            }
        });
    }

}
