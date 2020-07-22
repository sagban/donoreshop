import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from "../_services/form.service";
import {AuthenticationService} from "../_services/authentication.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) { }
  signupForm: FormGroup;
  message: string = "";
  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit(): void {
    this.authenticationService.signUp(this.signupForm.value).then(user=>{
      if(user){
        console.log(user);
        this.router.navigate(['dashboard']);
      }
    }).catch((error: any) => {

        switch (error.code) {
          case "UserNotConfirmedException":
            this.router.navigate(['start_campaign']);
            break;
          case "UsernameExistsException":
            this.router.navigate(['start_campaign']);
            break;
        }
      })
  }

}
