import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  feedback(){
      window.location.href = 'https://whis017.app.n8n.cloud/form/6e5903c5-6b26-403b-8c37-4646ff456235';
  }
  telegram() {
     window.open('https://t.me/restraunt2000bot', '_blank');
  }
}
