import { Routes } from '@angular/router';

import {SearchComponent} from "./search/search.component";
import {UploadComponent} from "./upload/upload.component";
import {ActivityComponent} from "./activity/activity.component";
import {LoginComponent} from "./login/login.component";
import {UsermanagementComponent} from "./usermanagement/user-management.component";
import {AuthenticationService} from "./shared/auth/authentication.service";

export const rootRouterConfig: Routes = [
  // Check user login
  { path: '', redirectTo: 'search', pathMatch: 'full', canActivate: [AuthenticationService] },
  { path: 'search', component: SearchComponent, canActivate: [AuthenticationService]},
  { path: 'upload', component: UploadComponent, canActivate: [AuthenticationService]},
  { path: 'activity', component: ActivityComponent, canActivate: [AuthenticationService]},
  { path: 'usermanagement', component: UsermanagementComponent, canActivate: [AuthenticationService]},

  { path: 'login', component: LoginComponent },

  // otherwise redirect to usermanagement
  { path: '**', redirectTo: '' }
];

