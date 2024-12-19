import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';

const lightColors = [
  "#F5FFFA", // Mint Cream
  "#F0F8FF", // Alice Blue
  "#FFF0F5", // Lavender Blush
  "#F0FFF0", // Honeydew
  "#FFF5EE", // Seashell
  "#FAF0E6", // Linen
  "#FFE4E1", // Misty Rose
  "#FFFFE0", // Light Yellow
  "#FFEFD5", // Papaya Whip
  "#FFDAB9", // Peach Puff
  "#EEE8AA", // Pale Goldenrod
  "#FFFACD", // Lemon Chiffon
  "#FFF8DC", // Cornsilk
  "#FAEBD7", // Antique White
  "#FFEBCD", // Blanched Almond
  "#E0FFFF", // Light Cyan
  "#B0E0E6", // Powder Blue
  "#FFB6C1", // Light Pink
  "#AFEEEE", // Pale Turquoise
  "#87CEFA"  // Light Sky Blue
];


@Component({
  selector: 'app-quotes',
  imports: [HttpClientModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})

export class QuotesComponent {
  quote = signal<string>("");
  color = signal<string>("");
  constructor(http: HttpClient){
    http.get('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random').subscribe((data: any) => {
      this.quote.set(data[0].q.toUpperCase());
      this.color.set("background: " + lightColors[Math.floor(Math.random() * lightColors.length)]);
    });
  }

}
