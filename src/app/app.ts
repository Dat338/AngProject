import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private router : Router){}
  protected readonly title = signal('AngProject');

  returnerr() {
    return this.router.url.includes("error")
  }
}
