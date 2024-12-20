import { CommonModule } from '@angular/common';
import { minidenticon } from 'minidenticons';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { timeout } from 'rxjs';

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
  imports: [HttpClientModule, CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})

export class QuotesComponent {

  quoteList: any = [];
  isVisible = signal<boolean>(false);
  isEnabled = signal<boolean>(false);
  quote = signal<string>("");
  color = signal<string>("");

  constructor(private http: HttpClient){
    this.getQuote();
  }

  //gets quote to display from quotelist and then deletes the quote from quotelist
  getQuote() {
    this.isEnabled.set(false);

    if (this.quoteList.length == 0) {
      this.getQuoteList();
    }
    else {
      const quote = this.quoteList[0].q.toUpperCase();
      this.quoteList.shift();
      this.quote.set(quote);
      localStorage.setItem('quoteList', JSON.stringify(this.quoteList));
      this.color.set("background: " + lightColors[Math.floor(Math.random() * lightColors.length)]);
      this.isVisible.set(true);
      this.isEnabled.set(true);
    }
  }

  downloadQuote(){
    const element = document.getElementById('quote-dialog');
    if (element) {
      htmlToImage.toPng(element)
        .then((dataUrl: string) => {
          const link = document.createElement('a');
          link.download = 'betterin-quote-' + Math.floor(Math.random() * 1000000000) + '.png';
          link.href = dataUrl;
          link.click();
        });
    }
  }

  getQuoteList() {
    const quoteList = localStorage.getItem('quoteList');
    this.quoteList = quoteList ? JSON.parse(quoteList) : [];
    if (this.quoteList.length > 0 && this.quoteList[0].length > 0) {
      this.getQuote();
    }
    else {
      this.http.get('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes').subscribe((data: any) => {
        this.quoteList = data;

        localStorage.setItem('quoteList', JSON.stringify(this.quoteList));
        this.getQuote();
        this.isVisible.set(true);
      });
    }
  }
}

