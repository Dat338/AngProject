import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterModule, NgStyle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router : Router) {}

  isLoggedIn = false;
  boxnotshow = false;

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
