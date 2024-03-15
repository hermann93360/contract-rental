import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom

})
export class StarRatingComponent {

  @Input()
  name!: string
}
