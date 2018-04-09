import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const GMAP_API_KEY = `AIzaSyAWckaSoMi4tF4ZO8ontykqEGjWi-yn7ng`;
const GMAP_GEO_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?result_type=locality&key=${GMAP_API_KEY}`;

@Injectable()
export class GeoService {
    private cache = {};

    constructor(private http: HttpClient) { }

    reverseGeocode(lat: number, long: number, cb: (err: string, res: string) => void): void {
        if (!lat || !long) {
            cb('Something went wrong. Please try again.', null);
            return;
        }

        const key = `${lat.toFixed(6)},${long.toFixed(6)}`;
        if (this.cache.hasOwnProperty(key)) {
            cb(null, this.cache[key]);
            return;
        }

        this.http.get(`${GMAP_GEO_API_URL}&latlng=${key}`).subscribe(
            res => {
                if (res['status'] === 'OK' && res.hasOwnProperty('results')) {
                    const location = res['results'][0]['formatted_address'];
                    this.cache[key] = location;
                    cb(null, location);
                } else {
                    cb('Something went wrong. Please try again.', null);
                }
            },
            err => {
                cb('Something went wrong. Please try again.', null);
            }
        );
    }

}
