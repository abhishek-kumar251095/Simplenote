import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onFormSubmit() {
    if (this.loginForm.status !== 'INVALID') {

      let userData = new UserModel(this.loginForm.value.username, this.loginForm.value.password);
      this.authService.login(userData)
                      .subscribe(res => {
                        this.authService.saveUsernameToLocalStorage(res.username);
                        this.authService.saveTokenToLocalStorage(res.token);
                        this.router.navigate(['']);
                      })
    }
  }

}
