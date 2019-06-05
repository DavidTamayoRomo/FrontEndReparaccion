import { Component, OnInit, Input, Output,OnChanges, EventEmitter} from '@angular/core';
declare var $: any;

@Component({
  selector: 'embryo-ProductGrid',
  templateUrl: './ProductGrid.component.html',
  styleUrls: ['./ProductGrid.component.scss']
})
export class ProductGridComponent implements OnInit ,OnChanges {
   //@Input() 

   @Input() products : any ;

   @Input() currency : string;

   @Input() gridLength : any;

   @Input() gridThree : boolean = false;

   @Output() addToCart: EventEmitter<any> = new EventEmitter();

   @Output() addToWishList: EventEmitter<any> = new EventEmitter();

   @Input() trabajos : any;


   trabajosDatos : any;


   loaded = false;
   lg     = 25;
   xl     = 25;

   trackByObjectID(index, hit) {
      return hit.objectID;
   }

   constructor() { }

   ngOnInit() {

      if(this.gridThree) {
         this.lg = 33;
         this.xl = 33;
      } 
   
   }

   ngOnChanges() {

      this.trabajosDatos = this.trabajos;
      console.log("trabajos",this.trabajosDatos);
      
   }

   




   public addToCartProduct(value:any) {
      this.addToCart.emit(value);
   }

   public onLoad() {
      this.loaded = true;
   }


   public productAddToWishlist(value:any, parentClass) {
      if(!($('.'+parentClass).hasClass('wishlist-active'))) {
         $('.'+parentClass).addClass('wishlist-active');
      }
      this.addToWishList.emit(value);
   }

   public checkCartAlready(singleProduct) {
      let products = JSON.parse(localStorage.getItem("cart_item")) || [];
      if (!products.some((item) => item.name == singleProduct.name)) {
         return true;
      }
   }

}
