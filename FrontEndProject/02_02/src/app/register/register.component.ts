import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  register(formValue) {

    //register in backend and then save token from server into  localStorage of browser
    this.auth.register(formValue).subscribe(res => {
      localStorage.setItem('token', res.value);
    }, (error) => {
      console.log(error);
    });

  }

}
