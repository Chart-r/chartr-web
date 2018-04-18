import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../service/user.service';
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

@Component({
    selector: 'app-ui-trip-card',
    templateUrl: './ui-trip-card.component.html',
    styleUrls: ['./ui-trip-card.component.css']
})
export class UiTripCardComponent implements OnInit {

    @Input() className: string;
    @Input() driverName: string;
    @Input() driverUID: string;
    @Input() rating = 'No rating';
    @Input() seatsfilled = 0;
    @Input() totalseats = 0;
    @Input() departtime: Date;
    @Input() departdest: string;
    @Input() arrivetime: Date;
    @Input() arrivedest: string;
    @Input() avatar = 'http://via.placeholder.com/50x50';
    @Input() loggedInUid: string;
    @Input() tripId: string;
    @Input() showButton: boolean;
    @Input() trip: Trip;
    @Input() parent: any;
    public submitting: boolean;
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.submitting = false;
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
    }

    formatDate(obj) {
        if (! (obj instanceof Date) || isNaN(obj.getTime())) {
            return 'No Estimate Provided';
        }

        return obj.toLocaleDateString('en-US', DATE_OPTIONS);
    }

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

    private updateParentTrips() {
        this.parent.otherTrips = this.parent.otherTrips.filter((trip: Trip) => {
            return trip.tripId !== this.tripId;
        });

        this.parent.pendingTrips.push(this.trip);
    }

}
