import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {

    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(formValue) {

    this.auth.login(formValue).subscribe(res => {
      localStorage.setItem('token', res.value);
      this.router.navigate['/'];
    }, (error) => {
      console.log(error);
    });

  }

}
