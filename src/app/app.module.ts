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


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        IndexComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        CognitoService,
        LoginService,
        SignupService,
        AuthenticationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
