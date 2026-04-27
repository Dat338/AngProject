import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { profile } from '../models/profile';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(private api : Api, private cdr : ChangeDetectorRef) {}
 ngOnInit() {
  
    this.api.api('users/profile').subscribe({
      next: (res: any) => {
        this.userinfo = res.data;
        console.log(this.userinfo);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.api.api('users/me').subscribe({
      next: (res: any) => {
        this.userinfo = res.data;
        console.log(this.userinfo);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  activeTab = 'profile';
  success : boolean = false;
  showDeleteConfirmation : boolean = false;



  sumedit(ngForm : any) {
    console.log(ngForm.value);
    this.api.apiput('users/edit', ngForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  tabb(tab : string) {
    if (tab ) {
      this.activeTab = tab;
    } else {
      this.activeTab = 'profile';
    }
  }
  sumpass(ngForm : any) {
    this.api.apiput('users/change-password', ngForm.value).subscribe({
      next: (res: any) => {
        this.success = res.isSuccess; 
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  deleteaccount() {
    this.api.apidelete(`users/delete`).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  userinfo : profile = {};
}
