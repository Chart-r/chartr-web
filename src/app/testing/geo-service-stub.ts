export class GeoServiceStub {
    reverseGeocode(lat: number, long: number, cb: (err: string, res: string) => void): void {
        cb(null, 'Test Loccation');
    }
}
