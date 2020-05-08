import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onFormSubmit() {
    if (this.registrationForm.status !== 'INVALID') {
      let userData = new UserModel(
                          this.registrationForm.value.username,
                          this.registrationForm.value.password,
                          this.registrationForm.value.email
                      );

      this.authService.register(userData)
                      .subscribe(res => {
                        if (res.status === 'success') {
                          this.router.navigate(['auth', 'login']);
                        }
                      });
    };
  }

}
