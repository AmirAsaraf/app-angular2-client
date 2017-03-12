/**
 * Created by aasaraf on 12/22/2016.
 */
import {Injectable} from "@angular/core";
import {User} from "./user";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Subject, Observable} from "rxjs";
import {Cookie} from "ng2-cookies";
import {Http, Headers} from "@angular/http";
import {Credentials} from "./credentials";
import any = jasmine.any;

var users = [
  new User('1000','admin','Fis Admin','admin','Administrator',true),
  new User('1001','modifier','Fis Modifier','modifier','Modifier',true),
  new User('1002','viewer','Fis Viewer','viewer','Viewer',true),
];

@Injectable()
export class AuthenticationService implements CanActivate {

  // URL to web api
  private WEB_ROOT = 'http://localhost:8081/rest/';
  private headers = new Headers({'Content-Type': 'application/json'});

  private loginURL = this.WEB_ROOT + 'login';
  private logoutURL = this.WEB_ROOT + 'logout';

  private loggedInUser: User;
  private subject: Subject<User> = new Subject<User>();

  readonly LOCAL_STORAGE_KEY = 'currentUser';
  readonly COOKIE_EXPIRATION_DAYS = 7;

  constructor( private router: Router, private http: Http){}

  getLoggedInUser(): Observable<User> {
    return this.subject.asObservable();
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
    this.subject.next(user);
  }

  logout() {
    return this.http.put(this.logoutURL, JSON.stringify(this.loggedInUser.userName), {headers: this.headers})
      .toPromise();
  }

  logoutOk() {
    this.setLoggedInUser(null);
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);

    this.router.navigate(['login']);
  }

  login(user, rememberMe){

    var credentials: Credentials = new Credentials(user.userName, user.password);

    return this.http.put(this.loginURL, JSON.stringify(credentials), {headers: this.headers})
      .toPromise();
  }

  loginOk(user, rememberMe, token) {
    this.setLoggedInUser(user);
    if (rememberMe) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(user));
    }

    this.router.navigate(['search']);
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //TODO - DEBUG
    console.log("User logged in?" + (this.loggedInUser && this.loggedInUser !== null));

    let userFromLocalStorage = this.getUserNameFromLocalStorage();

    //TODO - DEBUG
    console.log("User has cookie?" + userFromLocalStorage !== null);

    //TODO - Add logic to load user for localStorage

    if ( (this.loggedInUser && this.loggedInUser !== null) || userFromLocalStorage !== null ) {
      this.setLoggedInUser(new User(userFromLocalStorage.userId, userFromLocalStorage.userName, userFromLocalStorage.fullName, 'PWD',userFromLocalStorage.role, userFromLocalStorage.active));
      return true;
    }
    else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }

  private getUserNameFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
  }
}
