import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-post-trip',
    templateUrl: './post-trip.component.html',
    styleUrls: ['./post-trip.component.css']
})
export class PostTripComponent implements OnInit {

    public startLat: number;
    public startLong: number;
    public endLat: number;
    public endLong: number;
    public dateTime: Date;
    public price: number;
    public seats: number;
    public smoking: boolean;


    @ViewChild('start')
    public startRef: ElementRef;

    @ViewChild('end')
    public endRef: ElementRef;

    constructor(private mapsApiLoader: MapsAPILoader, private ngZone: NgZone) { }

    ngOnInit() {
        this.smoking = false;

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
                        this.startLat = place.geometry.location.lat();
                        this.startLong = place.geometry.location.lng();
                    }
                });
            });

            endAutocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place = startAutocomplete.getPlace();

                    if (place.geometry) {
                        this.endLat = place.geometry.location.lat();
                        this.endLong = place.geometry.location.lng();
                    }
                });
            });
        });
    }

    onSubmit(postTripForm: NgForm) {
        
    }

}
