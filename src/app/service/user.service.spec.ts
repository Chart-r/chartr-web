import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

describe('UserService', () => {
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ UserService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it('should GET a user', inject([UserService], (service: UserService) => {
        const mockResponse = new User();
        mockResponse.email = 'test@user.com';

        service.getUser('test@user.com').subscribe(user => {
            expect(user).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(`${environment.apiGatewayUrl}/user/test@user.com`);

        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));

    it('should POST a user', inject([UserService], (service: UserService) => {
        const mockResponse = { message: 'response' };
        const mockUser = new User();

        service.createUser(mockUser).subscribe(data => {
            expect(data).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(`${environment.apiGatewayUrl}/user`);

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));
});