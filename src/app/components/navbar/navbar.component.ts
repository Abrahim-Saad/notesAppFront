
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  // Injecting The Authorization Service in the constructor
  constructor(public _AuthService:AuthService, private _Router:Router) {}

  // To LogOut--> 1)Delete the token from the local storge
  //          --> 2)Navigate to the SignIn Form
  logOut()
  {
    localStorage.clear()
    this._Router.navigate(['/signin'])
  }
  
  ngOnInit() {
  }

}
