
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/Services/auth.service';

// Used to declare JQuery
declare var $: any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  // Style to implement according to the form stutus
  validFormStyle = { 'background-color': 'gray', 'border-color': 'gray' }
  invalidFormStyle = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }

  // Boolean value to control the text of the Sign-Up Form Button
  isSignUpButtonClicked = false

  // Used to determine if the entered email is already used or not
  isUniuqeEmail = false

  // Used to determine if the Account is Created Successfully or not
  isAccountCreatedSuccessfully = false

  // Injecting the Authorization Service in the constructor
  constructor(private _AuthService: AuthService) {}

  // Creating the sign-up form
  signUpForm = new FormGroup({
    // Creating the form feilds and validating the data that user enters
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)])

  })

  // This function is called when the sign-up button of the sign-up form is clicked!
  sendSignUpFormData() {

    this.isSignUpButtonClicked = true
    if (this.signUpForm.valid) {
      // If the form data is valid:
      //   Use the authorization service to send The Form Data to the Database using the signUp API inside the signUp Method 
      this._AuthService.signUpApiService(this.signUpForm.value).subscribe(
        serverResponse => {
          if (serverResponse.message == "success") {
            this.isSignUpButtonClicked = false
            this.isAccountCreatedSuccessfully = true
            this.isUniuqeEmail = false
            this.signUpForm.reset()
          } else {
            
            this.isUniuqeEmail = true
            this.isAccountCreatedSuccessfully = false
            this.isSignUpButtonClicked = false


          }
          
      })

    }
  }

  ngOnInit() {
    // Background --> JQuery Plugin
    $('#signUpSection').particleground();
  }

}
