import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";

import "./navbar.component.scss";
import {User} from "../auth/user";
import {Router} from "@angular/router";

@Component({
  selector: 'navigation',
  template: require('./navbar.component.html'),
})
export class NavbarComponent implements OnInit {

  private showNavigation = false;
  private userName = '';

  private logoutPromise : Promise<any>;

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router) {}

  ngOnInit() {
    this.authenticationService.getLoggedInUser().subscribe((user: User) => {
      if (user !== null) {
        //TODO - DEBUG
        console.log('Welcome %s', user.userName);
        this.userName = user.userName;
        this.showNavigation = true;
      }
      else {
        //TODO - DEBUG
        console.log('Bye...');
        this.showNavigation = false;
      }
    });
  }

  logout() {
    this.logoutPromise = this.authenticationService.logout()
      .then((response :any) =>
        this.authenticationService.logoutOk()
      )
      .catch((error:any) =>
        this.logoutFail());
  }

  logoutFail() {
    //On failure
  }

}
