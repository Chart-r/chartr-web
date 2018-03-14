export class Trip {
    public startLat: number;
    public startLong: number;
    public endLat: number;
    public endLong: number;
    public startTime: Date;
    public price: number;
    public seats: number;
    public smoking: boolean;
    public driver: string;

    constructor() {
        this.startLat = null;
        this.startLong = null;
        this.endLat = null;
        this.endLong = null;
        this.startTime = null;
        this.price = null;
        this.seats = null;
        this.smoking = false;
        this.driver = null;
    }

    validLocations() {
        const valid = (
            this.startLat !== null &&
            this.startLong !== null &&
            this.endLat !== null &&
            this.endLong !== null
        );
        
        return valid;
    }
}
