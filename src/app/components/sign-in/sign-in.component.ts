import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/Services/auth.service";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})

export class SignInComponent implements OnInit {

  // Style to implement according to the form stutus
  validFormStyle = { 'background-color': 'gray', 'border-color': 'gray' }
  invalidFormStyle = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }

  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.isLoggedIn()) {
      this._Router.navigate(["/profile"]);
    }
  }

  // Creating the sign-in form
  signInForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]),
  });

  // This function is called when the sign-in button of the sign-in form is clicked!
  sendSignInFormData() {
    if (this.signInForm.valid) {
      let userEmailAndPassword = this.signInForm.value;
      this._AuthService.signInApiService(userEmailAndPassword).subscribe(
        (serverResponse) => {
          console.log(serverResponse);
          
          if (serverResponse.message == "success") {
            this._Router.navigate(["/profile"]);
            localStorage.setItem("TOKEN", serverResponse.token);
          }
      });
    }
  }

  ngOnInit() {
    // Background --> JQuery Plugin
    $("#signInSection").particleground();
  }
}
