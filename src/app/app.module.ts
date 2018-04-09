import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'primeng/calendar';

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
import { UiAppFooterComponent } from './component/ui/ui-app-footer/ui-app-footer.component';
import { UiAppHeaderComponent } from './component/ui/ui-app-header/ui-app-header.component';
import { PostTripComponent } from './component/post-trip/post-trip.component';
import { UserService } from './service/user.service';


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
        UiUserDetailsSmallComponent,
        UiAppFooterComponent,
        UiAppHeaderComponent,
        PostTripComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAWckaSoMi4tF4ZO8ontykqEGjWi-yn7ng',
            libraries: ['places']
        }),
        CalendarModule,
        BrowserAnimationsModule
    ],
    providers: [
        CognitoService,
        LoginService,
        SignupService,
        AuthenticationService,
        TripService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
