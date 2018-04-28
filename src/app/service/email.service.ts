import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
const SEND_EMAIL_API = `${environment.apiGatewayUrl}/email/confirmation`;

/** Class representing the email service */
@Injectable()
export class EmailService { 
    /**
     * Create an email service
     * @param http The Angular http client
     */
    constructor(private http: HttpClient) { }

    /**
     * Send confirmation email to users
     * @param body The request body to send
     * @param cb The callback to call when the reqeust finishes
     */
    sendMail(body: Object, cb: (err: string, result: string) => void): void {
        if (!body) {
            cb('Please specify request body.', null);
            return;
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        this.http.post(SEND_EMAIL_API, body, httpOptions).subscribe(
            res => {
                cb(null, 'Success');
            },
            err => {
                cb('Something went wrong. Please try again.', null);
            }
        );
    }
}
