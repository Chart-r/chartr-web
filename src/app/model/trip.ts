/** Class representing a trip */
export class Trip {
    /** The starting latitude of the trip */
    public startLat: number;
    /** The starting longitude of the trip */
    public startLong: number;
    /** The ending latitude of the trip */
    public endLat: number;
    /** The ending longitude of the trip */
    public endLong: number;
    /** The start time of the trip */
    public startTime: Date;
    /** The end time of the trip */
    public endTime: Date;
    /** The price of the trip */
    public price: number;
    /** The seats available for the trip */
    public seats: number;
    /** Flag indicating whether the trip is smoking */
    public smoking: boolean;
    /** The driver of the trip */
    public driver: string;
    /** The TID of the trip */
    public tripId: string;
    /** The users associated with the trip */
    public users: any;

    /**
     * Create a trip
     */
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

    /**
     * Determine whether this trip is valid
     * @returns A flag indicating if the trip is valid
     */
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

    /**
     * Determine the number of seats filled on this trip
     * @returns The number of filled seats
     */
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
