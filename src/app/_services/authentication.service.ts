import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface NewUser {
  email: string,
  phone: string,
  password: string,
  firstName: string,
  lastName: string
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public _getSession: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('session')));
  public getSessionEmitter: Observable<boolean> = this._getSession.asObservable();

  public _getVerified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('verified')));
  public getVerifiedEmitter: Observable<boolean> = this._getVerified.asObservable();
  public _getVerifiedEmail: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('verifiedEmail'));
  public getVerifiedEmailEmitter: Observable<string> = this._getVerifiedEmail.asObservable();
  public _getVerifiedUserName: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('verifiedUserName'));
  public getVerifiedUserNameEmitter: Observable<string> = this._getVerifiedUserName.asObservable();
  session:boolean;
  base: any = environment.apiUrl;
  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut';
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  constructor(private http: HttpClient) {
    Hub.listen('auth',(data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
  }

  checkSession(): any {
    const url = this.base + '/check';
    return this.http.get(url, {
      withCredentials: true  // <=========== important!
    });
  }

  getSession(){
    return this._getSession.value;
  }
  getVerified(){
    return this._getVerified.value;
  }
  getUserName(){
    return this._getVerifiedUserName.value;
  }

  logout(): any {
    const url = this.base + '/logout';
    return this.http.get(url, {
      withCredentials: true  // <=========== important!
    });
  }
  signUp(user: NewUser): Promise<CognitoUser|any> {
    return Auth.signUp({
      "username": user.email,
      "password": user.password,
      "attributes": {
        "email": user.email,
        "given_name": user.firstName,
        "family_name": user.lastName,
        "phone_number": user.phone
      }
    });
  }

  signIn(username: string, password: string):Promise<CognitoUser|any> {
    return new Promise((resolve,reject) => {
      Auth.signIn(username,password)
      .then((user: CognitoUser|any) => {
        this.loggedIn = true;
        resolve(user);
      }).catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

  socialSignIn(provider:CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }

}
