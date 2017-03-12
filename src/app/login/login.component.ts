import {Component} from '@angular/core';
import {AuthenticationService} from "../shared/auth/authentication.service";
import './login.component.scss'
import {User} from "../shared/auth/user";


@Component({
  selector: 'login-form',
  template: require('./login.component.html'),
})
export class LoginComponent {
  public user = new User('','','','','',true);
  public model = {errorMsg : '', rememberMe: false};

  private loginPromise : Promise<any>;

  constructor(
    private authenticationService:AuthenticationService) {}

  login() {
    this.loginPromise = this.authenticationService.login(this.user, this.model.rememberMe)
      .then((response :any) => {
        var responseObject = JSON.parse(response._body);
        this.authenticationService.loginOk(responseObject, this.model.rememberMe, responseObject.authToken)
      })
      .catch((error:any) =>
        this.loginFail());
  }

  loginFail() {
    this.model.errorMsg = 'Failed to login';
  }
}
