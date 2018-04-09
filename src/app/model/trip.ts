export class Trip {
    public startLat: number;
    public startLong: number;
    public endLat: number;
    public endLong: number;
    public startTime: Date;
    public endTime: Date;
    public price: number;
    public seats: number;
    public smoking: boolean;
    public driver: string;
    public tripId: string;
    public users: any;

    constructor() {
        this.startLat = null;
        this.startLong = null;
        this.endLat = null;
        this.endLong = null;
        this.startTime = null;
        this.endTime = null;
        this.price = null;
        this.seats = null;
        this.smoking = false;
        this.driver = null;
        this.tripId = null;
        this.users = {};
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

    seatsfilled() {
        return Object.keys(this.users).length - 1;
    }
}
