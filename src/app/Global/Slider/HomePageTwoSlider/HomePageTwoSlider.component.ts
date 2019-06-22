import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
   selector: 'embryo-HomePageTwoSlider',
   templateUrl: './HomePageTwoSlider.component.html',
   styleUrls: ['./HomePageTwoSlider.component.scss']
})
export class HomePageTwoSliderComponent implements OnInit, OnChanges {

   @Input() isRTL : any;

   slideConfig : any;
   

   slides = [
      {
         img: "assets/images/slider-1.jpg",
         content:"<h4>Servicio</h4><h1 class='text-main'></h1><h1 class='text-bold mb-4'>Plomeria <sup class='bold-sup'></sup></h1>"
      },
      {
         img: "assets/images/slider-2.jpg",
         content:"<h4>Servicio</h4><h1 class='text-main'> </h1><h1 class='text-bold mb-4'>Carpinteria <sup class='bold-sup'></sup></h1>"
      },
      {
         img: "assets/images/slider-3.jpg",
         content:"<h4> Servicio</h4><h1 class='text-main'></h1><h1 class='text-bold mb-4'>Limpieza <sup class='bold-sup'></sup></h1>"
      },
      {
         img: "assets/images/slider-4.jpg",
         content:"<h4>Servicio</h4><h1 class='text-main'> </h1><h1 class='text-bold mb-4'>Electrico <sup class='bold-sup'></sup></h1>"
      }
   ];

   constructor() { }

   ngOnInit() {
   }

   ngOnChanges() {
      this.slideConfig = {
         infinite: true,
         centerMode: true,
         centerPadding: '400px',
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 2000,
         dots: false,
         rtl: this.isRTL,
         responsive: [
            {
               breakpoint: 1400,
               settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '300px',
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 1199,
               settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '150px',
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 899,
               settings: {
                  arrows: false,
                  centerMode: true,
                  centerPadding: '75px',
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 768,
               settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: '0',
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 480,
               settings: {
                  arrows: false,
                  centerMode: false,
                  centerPadding: '0',
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            }
         ]
      };
   }

}
