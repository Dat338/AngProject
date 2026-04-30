import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private postapi : Api, private cdr : ChangeDetectorRef, private router : Router) {

  }
  snackbar = inject(MatSnackBar)

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  code = '';
  display = false;

  register() {
    this.postapi.apipost('auth/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }).subscribe((resp : any) => {
      console.log(resp);
      if (resp.data) {
        this.display = true;
        this.cdr.detectChanges();
                this.snackbar.open(`please verify!`, `close`, {
          duration: 2000,
          panelClass: ['success-snackbar']
      })
      }
    }, (err : any) => {this.snackbar.open(`please enter correct validations`,`close`, {
      duration: 2000,
      panelClass: ['error-snackbar']
    })});
    if (this.display) {
    this.postapi.apipost(`auth/resend-email-verification/${this.email}`, {}).subscribe((resp : any) => {
      {
        this.snackbar.open(`verification has been sent`, `close`, {
          duration: 2000,
          panelClass: ['success-snackbar']
      })
        console.log(resp)};
    }, (err : any) => {
      console.log(err);
    });
  }
  }
    
    resend() {    this.postapi.apipost(`auth/resend-email-verification/${this.email}`, {}).subscribe((resp : any) => {
      console.log(resp);
    }, (err : any) => {
      console.log(err);
    });
  }
  verification() {
    this.postapi.apiput(`auth/verify-email`, {
      email: this.email,
      code: this.code
    })
    .subscribe((resp : any) => {
      console.log(resp);
      this.router.navigate(['/login']);
    }, (err : any) => {
      console.log(err);
    });
    }


}
