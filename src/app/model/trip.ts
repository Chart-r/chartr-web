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

    valid() {
        const currentDate = new Date();
        const valid = (
            this.startTime !== null &&
            this.startTime.getTime() >= currentDate.getTime() &&
            this.seats > 0 &&
            this.price > 0
        );
        
        return valid;
    }

    seatsfilled() {
        let filled = 0;

        for (const uid in this.users) {
            if (this.users[uid] === 'riding') {
                filled++;
            }
        }

        return filled;
    }
}
