import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-quotes',
  imports: [HttpClientModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})
export class QuotesComponent {
  quote = signal<string>("");

  constructor(http: HttpClient){
    http.get('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random').subscribe((data: any) => {
      this.quote.set(data[0].q);
    });
  }
}
