import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() fontSize: number = 20;
  starsArray = Array(5).fill(0);
}
