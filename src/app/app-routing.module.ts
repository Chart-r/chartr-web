import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './component/index/index.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { LogoutComponent } from './component/logout/logout.component';
import { HomeComponent } from './component/home/home.component';
import { TripsComponent } from './component/trips/trips.component';
import { MyTripsComponent } from './component/my-trips/my-trips.component';
import { PastTripsComponent } from './component/past-trips/past-trips.component';
import { PostTripComponent } from './component/post-trip/post-trip.component';
import { SearchComponent } from './component/search/search.component';

const routes = [
    { path: '', component: IndexComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'post', component: PostTripComponent },
    { path: 'search', component: SearchComponent },
    { path: 'past', component: PastTripsComponent },
    { path: 'mytrips', component: MyTripsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
