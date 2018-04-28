import { TestBed, inject } from '@angular/core/testing';

import { EmailService } from './email.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
const SEND_EMAIL_API = `${environment.apiGatewayUrl}/email/confirmation`;

describe('EmailService', () => {
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ EmailService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([EmailService], (service: EmailService) => {
        expect(service).toBeTruthy();
    }));

    it('should send an email', inject([EmailService], (service: EmailService) => {
        const mockResponse = {
           'status' : 'OK'
        };

        const mockRequest = {
            'driverName': 'Test',
            'riderName': 'User',
            'driverPhone': '+1-222-333-4444',
            'riderPhone': '+1-111-222-3333',
            'driverEmail': 'test@gmail.com',
            'riderEmail': 'test2@example.edu',
            'tripTime': 1524631194373
        };

        service.sendMail(mockRequest, (err, res) => {
            expect(res).toBeTruthy();
        });

        const req = httpTestingController.expectOne(SEND_EMAIL_API);

        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));

    it('should error given no email params', inject([EmailService], (service: EmailService) => {
        service.sendMail(undefined, (err, res) => {
            expect(err).toBe('Please specify email options.');
            expect(res).toBeNull();
        });
    }));
});
