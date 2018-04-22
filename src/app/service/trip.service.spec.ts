import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TripService } from './trip.service';
import { User } from '../model/user';
import { Trip } from '../model/trip';
import { environment } from '../../environments/environment';
import { GeoService } from './geo.service';
import { GeoServiceStub } from '../testing/geo-service-stub';

describe('TripService', () => {
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ 
                TripService,
                { provide: GeoService, useClass: GeoServiceStub }
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([TripService], (service: TripService) => {
        expect(service).toBeTruthy();
    }));

    it('should POST trip', inject([TripService], (service: TripService) => {
        const mockUser = new User();
        const mockTrip = new Trip();
        const mockResponse = { message: 'response' };

        mockUser.uid = '1';
        mockTrip.startTime = new Date();

        service.createTrip(mockUser, mockTrip).subscribe(data => {
            expect(data).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(`${environment.apiGatewayUrl}/user/1/trip`);
        
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));

    it('should GET trips', inject([TripService], (service: TripService) => {
        const mockResponse = { message: 'response' };

        service.getAllTrips().subscribe(data => {
            expect(data).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(`${environment.apiGatewayUrl}/trip/current`);

        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));

    it('should GET non-current trips', inject([TripService], (service: TripService) => {
        const mockResponse = { message: 'response' };

        service.getNonCurrentTrips().subscribe(data => {
            expect(data).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne(`${environment.apiGatewayUrl}/trip`);

        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));
});
