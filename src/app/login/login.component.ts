import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from "../_services/form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {first} from "rxjs/internal/operators";
import { CognitoUser } from '@aws-amplify/auth';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = "";
  loginForm:FormGroup;
  returnUrl: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private formService: FormService,
              private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  signIn() {

    this.authenticationService.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((user: CognitoUser|any) => {
        this.router.navigate(['dashboard']);
      })
      .catch((error: any) => {

        switch (error.code) {
          case "UserNotConfirmedException":
            this.router.navigate(['confirm']);
            break;
          case "UsernameExistsException":
            this.router.navigate(['start_campaign']);
            break;
        }
      })
  }

}
