import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated=this.authService.isAuthenticated;
  }


  logout() {
    this.authService.logout();
  }

}
