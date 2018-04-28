import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../service/user.service';
import { EmailService } from '../../../service/email.service';
import { User } from '../../../model/user';
import { Trip } from '../../../model/trip';

const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit' 
};

/** Class representing a Chartr trip card */
@Component({
    selector: 'app-ui-trip-card',
    templateUrl: './ui-trip-card.component.html',
    styleUrls: ['./ui-trip-card.component.css']
})
export class UiTripCardComponent implements OnInit {

    /** The CSS class name to be applied to the card */
    @Input() className: string;
    /** The name of this trip's driver */
    @Input() driverName: string;
    /** The UID of this trip's driver */
    @Input() driverUID: string;
    /** The rating of this trip's driver */
    @Input() rating = 'No rating';
    /** The number of seats filled on this trip */
    @Input() seatsfilled = 0;
    /** The total seats available for this trip */
    @Input() totalseats = 0;
    /** The departure time for this trip */
    @Input() departtime: Date;
    /** The departure location for this trip */
    @Input() departdest: string;
    /** The arrival time for this trip */
    @Input() arrivetime: Date;
    /** The arrival location for this trip */
    @Input() arrivedest: string;
    /** The driver's avatar */
    @Input() avatar = 'http://via.placeholder.com/50x50';
    /** The UID of the logged in user */
    @Input() loggedInUid: string;
    /** The TID of the trip */
    @Input() tripId: string;
    /** Flag indicating whether the join button should be shown */
    @Input() showButton: boolean;
    /** Flag indicating whether interested riders should be shown */
    @Input() showInterestedRiders: boolean;
    /** The trip */
    @Input() trip: Trip;
    /** The parent element of the Chartr trip card */
    @Input() parent: any;
    /** Flag indicating whether a submission is occurring */
    public submitting: boolean;
    /** This trip's interested riders */
    public interestedRiders: User[];

    constructor(private userService: UserService, private emailService: EmailService) { }

    /**
     * ngOnInit lifecycle hook for the Chartr trip card.
     * This function gets the driver's name and populates the interested riders.
     */
    ngOnInit() {
        this.submitting = false;
        this.interestedRiders = [];
        // get driver's name
        if (this.driverUID && !this.driverName) {
            this.driverName = '-';
            this.userService.getUserByUid(this.driverUID).subscribe(
                (res: User) => {
                    this.driverName = res.name;
                },
                err => {
                    console.error(err);
                }
            );
        }

        if (this.showInterestedRiders) {
            for (const uid in this.trip.users) {
                if (this.trip.users[uid] === 'pending') {
                    this.userService.getUserByUid(uid).subscribe(
                        (res: User) => {
                            this.interestedRiders.push(res);
                        },
                        err => {
                            console.error(err);
                        }
                    );
                }
            }
        }
    }

    /**
     * Format a date object for display
     * @param obj The date to format
     */
    formatDate(obj) {
        if (! (obj instanceof Date) || isNaN(obj.getTime())) {
            return 'No Estimate Provided';
        }

        return obj.toLocaleDateString('en-US', DATE_OPTIONS);
    }

    // Formats a stored phone number from the +12223334444 to the +1-222-333-4444 format.
    formatPhone(str) {
        return [
            str.substring(0, 2),
            str.substring(2, 5),
            str.substring(5, 8),
            str.substring(8)
        ].join('-');
    }

    /**
     * Request to join a trip
     */
    requestToJoinTrip() {
        this.submitting = true;
        this.userService.addPendingUserToTrip(this.loggedInUid, this.tripId).subscribe(
            res => {
                this.updateParentTrips();
                this.submitting = false;
            },
            err => {
                console.error(err);
                this.submitting = false;
            }
        );
    }

    /**
     * Accept a user to a trip
     * @param uid The UID of the accepted user
     */
    acceptRider(uid: string) {
        if (this.seatsfilled < this.totalseats) {
            this.userService.acceptRiderForTrip(uid, this.tripId).subscribe(
                res => {
                    this.seatsfilled++;
                    this.removeInterestedRider(uid);

                    // get driver details
                    this.userService.getUserByUid(this.driverUID).subscribe(
                        (driver: User) => {
                            // get rider details
                            this.userService.getUserByUid(uid).subscribe(
                                (rider: User) => {
                                    // send emails
                                    this.emailService.sendMail({
                                        driverName: driver.name,
                                        riderName: rider.name,
                                        driverPhone: this.formatPhone(driver.phone),
                                        riderPhone: this.formatPhone(rider.phone),
                                        driverEmail: driver.email,
                                        riderEmail: rider.email,
                                        tripTime: +this.arrivetime
                                    }, (err, res) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                    });
                                },
                                err => {
                                    console.error(err);
                                }
                            );
                        },
                        err => {
                            console.error(err);
                        }
                    );
                },
                err => {
                    console.error(err);
                }
            );
        }

        else {
            window.alert('This ride is already full.');
        }
    }

    /**
     * Reject a user from a trip
     * @param uid The UID of the rejected user
     */
    rejectRider(uid: string) {
        this.userService.rejectRiderForTrip(uid, this.tripId).subscribe(
            res => {
                this.removeInterestedRider(uid);
            },
            err => {
                console.error(err);
            }
        );
    }

    /**
     * Update the parent component's trips
     */
    private updateParentTrips() {
        this.parent.otherTrips = this.parent.otherTrips.filter((trip: Trip) => {
            return trip.tripId !== this.tripId;
        });

        this.parent.pendingTrips.push(this.trip);
    }

    /**
     * Remove accepted/rejected user from the interested riders list
     * @param uid The UID of the user to remove
     */
    private removeInterestedRider(uid: string) {
        this.interestedRiders = this.interestedRiders.filter((user: User) => {
            return user.uid !== uid;
        });
    }

}
