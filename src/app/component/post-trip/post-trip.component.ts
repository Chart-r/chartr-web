import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Trip } from '../../model/trip';
import { TripService } from '../../service/trip.service';

@Component({
    selector: 'app-post-trip',
    templateUrl: './post-trip.component.html',
    styleUrls: ['./post-trip.component.css']
})
export class PostTripComponent implements OnInit {
    public trip: Trip;
    public user: User;

    public error: string;
    public success: string;
    public submitting = false;


    @ViewChild('start')
    public startRef: ElementRef;

    @ViewChild('end')
    public endRef: ElementRef;

    constructor(
        private mapsApiLoader: MapsAPILoader, 
        private ngZone: NgZone,
        private authenticationService: AuthenticationService,
        private tripService: TripService,
        private router: Router
    ) { }

    ngOnInit() {
        this.trip = new Trip();
        this.trip.startLat = 39.8282;
        this.trip.startLong = -98.5795;
        this.trip.endLat = 39.8282;
        this.trip.endLong = -98.5795;
        this.authenticationService.getAuthenticatedUser((err, cognitoUser) => {
            if (err) {
                console.error(err);
                this.router.navigateByUrl('/');
            }

            else if (cognitoUser) {
                this.authenticationService.getUserAttributes(cognitoUser, (err, user) => {
                    if (err) {
                        console.error(err);
                        this.router.navigateByUrl('/');
                    }

                    else {
                        this.user = user;
                        this.setUpPostTripForm();
                    }
                });
            }

            else {
                this.router.navigateByUrl('/');
            }
        }); 
    }

    onSubmit(postTripForm: NgForm) {
        this.submitting = true;
        if (this.trip.valid() && postTripForm.form.valid) {
            this.tripService.createTrip(this.user, this.trip).subscribe(
                response => {
                    this.error = null;
                    this.success = 'Successfully created trip.';
                    postTripForm.reset();
                    this.submitting = false;
                },
                err => {
                    console.error(err);
                    this.error = 'Error creating trip. Please try again.';
                    this.success = null;
                    this.submitting = false;
                }
            );
        }

        else {
            this.error = 'Please complete all fields correctly.';
            this.success = null;
            this.submitting = false;
        }
    }

    private setUpPostTripForm() {
        this.mapsApiLoader.load().then(() => {
            const startAutocomplete = new google.maps.places.Autocomplete(this.startRef.nativeElement, {
                types: ['address']
            });

            const endAutocomplete = new google.maps.places.Autocomplete(this.endRef.nativeElement, {
                types: ['address']
            });

            startAutocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place = startAutocomplete.getPlace();

                    if (place.geometry) {
                        this.trip.startLat = place.geometry.location.lat();
                        this.trip.startLong = place.geometry.location.lng();
                    }
                });
            });

            endAutocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place = endAutocomplete.getPlace();

                    if (place.geometry) {
                        this.trip.endLat = place.geometry.location.lat();
                        this.trip.endLong = place.geometry.location.lng();
                    }
                });
            });
        });
    }
}
