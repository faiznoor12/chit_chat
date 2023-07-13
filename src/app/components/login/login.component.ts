import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSubmit:boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toaster:HotToastService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  pass = false;
  showPass(input: HTMLInputElement) {
    this.pass = !this.pass;
    if (this.pass) input.type = 'text';
    else input.type = 'password';
  }

  submit() {
    this.isSubmit=true;
    console.log('dfxcgvbhjkl;');

    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).pipe(
      this.toaster.observe({
        success:'success',
        loading:'Loging in...',
        error:'there is an error'
      })
    ).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
