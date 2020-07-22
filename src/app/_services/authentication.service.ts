import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface NewUser {
  email: string,
  password: string
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base: any = environment.apiUrl;
  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();


  constructor(private http: HttpClient) {
    Hub.listen('auth',(data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
  }


  public signUp(user: NewUser): Promise<CognitoUser|any> {
    return Auth.signUp({
      "username": user.email,
      "password": user.password,
      "attributes": {
        "email": user.email
      }
    });
  }

  public signIn(username: string, password: string):Promise<CognitoUser|any> {
    return new Promise((resolve,reject) => {
      Auth.signIn(username,password)
      .then((user: CognitoUser|any) => {
        this.loggedIn = true;
        resolve(user);
      }).catch((error: any) => reject(error));
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

}
