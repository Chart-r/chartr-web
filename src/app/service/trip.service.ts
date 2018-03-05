import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

const TRIP_URL = `${environment.apiGatewayUrl}/trip`;

@Injectable()
export class TripService {

    constructor(private http: HttpClient) { }

}
