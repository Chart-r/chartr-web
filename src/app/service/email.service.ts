import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
const SEND_EMAIL_API = `${environment.apiGatewayUrl}/email/confirmation`;

@Injectable()
export class EmailService {
    constructor(private http: HttpClient) { }

    sendMail(options: Object, cb: (err: string, result: string) => void): void {
        if (!options) {
            cb('Please specify email options.', null);
            return;
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        this.http.post(SEND_EMAIL_API, options, httpOptions).subscribe(
            res => {
                cb(null, 'Success');
            },
            err => {
                cb('Something went wrong. Please try again.', null);
            }
        );
    }
}
