import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    let authObs = new Observable<AuthResponseData>();
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    
    if(this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(resData => {
      console.log('sign up reponse is ' + resData);
      this.isLoading = false;
    }, err => {
      console.log('sign up failure reponse is ' + err);
      this.errorMessage = err;
      this.isLoading = false;
    });
    form.reset();
  }



}
