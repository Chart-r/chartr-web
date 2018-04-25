/** Class representing the fake geo service used in testing */
export class GeoServiceStub {
    /**
     * Get a location from a given latitude/longitude
     * @param lat The latitude
     * @param long The longitude
     * @param cb The callback to call when the "request" finishes
     */
    reverseGeocode(lat: number, long: number, cb: (err: string, res: string) => void): void {
        cb(null, 'Test Loccation');
    }
}
