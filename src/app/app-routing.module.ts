import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './component/index/index.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { LogoutComponent } from './component/logout/logout.component';
import { HomeComponent } from './component/home/home.component';

const routes = [
    { path: '', component: IndexComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
