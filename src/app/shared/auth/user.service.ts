/**
 * Created by aasaraf on 12/22/2016.
 */
import {Injectable} from "@angular/core";
import {User} from "./user";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

var users = [
  new User('1','admin','Fis Admin','admin','Administrator',true),
  new User('2','modifier','Fis Modifier','modifier','Modifier', true),
  new User('3','viewer','Fis Viewer','viewer','Viewer',true),
];

@Injectable()
export class UserService {

  // URL to web api
  private usersURL = 'http://localhost:8081/rest/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  getUsers ():Promise<User[]> {
    return this.http.get(this.usersURL)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  addUser (user: User):Promise<User> {
    user.userId = this.getMaxUserId();
    return this.http.post(this.usersURL, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  removeUser (userId) {
    return this.http.delete(this.usersURL + "/" + userId, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  modifyUser (user: User) {
    return this.http.put(this.usersURL + "/" + user.userId, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  private getMaxUserId() {
    return Math.max.apply(Math,users.map(function(o){return o.userId;})) + 1;
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
