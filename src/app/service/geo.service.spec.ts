import { TestBed, inject } from '@angular/core/testing';

import { GeoService } from './geo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GeoService', () => {
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ GeoService ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should be created', inject([GeoService], (service: GeoService) => {
        expect(service).toBeTruthy();
    }));

    it('should get a location', inject([GeoService], (service: GeoService) => {
        const mockResponse = {
           'results' : [{'formatted_address' : 'New York, NY, USA'}],
           'status' : 'OK'
        };

        service.reverseGeocode(40.714224, -73.961452, (err, res) => {
            expect(res).toContain('New York');
        });

        let url = 'https://maps.googleapis.com/maps/api/geocode/json?';
        url += 'result_type=locality&key=AIzaSyAWckaSoMi4tF4ZO8ontykqEGjWi-yn7ng';
        url += '&latlng=40.714224,-73.961452';
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
        httpTestingController.verify();
    }));
});
