import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

export function passwordMatchValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const conformPassword = control.get('conformPassword')?.value;

    if (password && conformPassword && password !== conformPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  isSubmit: boolean = false;

  constructor(private authService:AuthenticationService , private router : Router , private toaster : HotToastService ,private userService:UsersService){}


  signUpForm = new FormGroup(
    {
      name: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl( '',Validators.required),
      conformPassword: new FormControl('',Validators.required),
    },
    { validators: passwordMatchValidators() }
    );

    get fc() {
      return this.signUpForm.controls;
    }
    submit() {
      this.isSubmit = true;

      if (!this.signUpForm.valid) return;
      Validators
      const {name ,email, password } = this.signUpForm.value;

      this.authService.signUp(email as string, password!).pipe(
        switchMap(({user : {uid}})=>  this.userService.addUser({uid,email,displayName:name})),
        this.toaster.observe({
          success:'success',
          loading:'loading',
          error:({message})=> `${message}`
        })
      ).subscribe(()=>{
        this.router.navigateByUrl('/home')
      })


    }
  }
