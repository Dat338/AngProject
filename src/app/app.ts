import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { Register } from "./register/register";
import { Login } from "./login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, Register, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AngProject');
}
