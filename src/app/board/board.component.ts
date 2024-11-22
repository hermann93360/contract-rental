import { Component } from '@angular/core';
import {AppModule} from "../app.module";
import {InputComponent} from "../elements/input/input.component";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  title = 'ng-carousel-demo';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<span class="material-symbols-outlined">arrow_back_ios_new</span>',
      '<span class="material-symbols-outlined">arrow_forward_ios</span>',
    ],
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  commentOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<span class="material-symbols-outlined">arrow_back_ios_new</span>',
      '<span class="material-symbols-outlined">arrow_forward_ios</span>',
    ],
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  slides = [
    { id: "1", img: "assets/images/Manycar_28-04-2024-41.jpg" },
    { id: "2", img: "assets/images/Manycar_28-04-2024-7.jpg" },
    { id: "3", img: "assets/images/Manycar_28-04-2024-8.jpg" },
    { id: "4", img: "assets/images/Manycar_28-04-2024-30.jpg" },
    { id: "5", img: "assets/images/Manycar_28-04-2024-9.jpg" }
  ];

  comments = [
    { id: "1", img: "assets/images/Manycar_28-04-2024-41.jpg" },
    { id: "2", img: "assets/images/Manycar_28-04-2024-7.jpg" },
    { id: "3", img: "assets/images/Manycar_28-04-2024-8.jpg" },
    { id: "4", img: "assets/images/Manycar_28-04-2024-30.jpg" },
    { id: "5", img: "assets/images/Manycar_28-04-2024-9.jpg" }
  ];
}
