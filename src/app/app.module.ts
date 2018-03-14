import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './component/index/index.component';

import { CognitoService } from './service/cognito.service';
import { LoginService } from './service/login.service';
import { SignupComponent } from './component/signup/signup.component';
import { SignupService } from './service/signup.service';
import { AuthenticationService } from './service/authentication.service';
import { LogoutComponent } from './component/logout/logout.component';
import { HomeComponent } from './component/home/home.component';
import { TripsComponent } from './component/trips/trips.component';
import { TripService } from './service/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { UiMessageComponent } from './component/ui/ui-message/ui-message.component';
import { UiButtonComponent } from './component/ui/ui-button/ui-button.component';
import { UiTripCardComponent } from './component/ui/ui-trip-card/ui-trip-card.component';
import { UiTripDetailsComponent } from './component/ui/ui-trip-details/ui-trip-details.component';
import { UiUserDetailsSmallComponent } from './component/ui/ui-user-details-small/ui-user-details-small.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        IndexComponent,
        SignupComponent,
        LogoutComponent,
        HomeComponent,
        TripsComponent,
        UiMessageComponent,
        UiButtonComponent,
        UiTripCardComponent,
        UiTripDetailsComponent,
        UiUserDetailsSmallComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        CognitoService,
        LoginService,
        SignupService,
        AuthenticationService,
        TripService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
