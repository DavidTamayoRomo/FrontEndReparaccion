import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
declare var $: any;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {EmbryoService } from '../../Services/Embryo.service';
import { ContratoModel } from '../../Pages/Products/DetailPage/models/contrato.model';


@Component({
  selector: 'embryo-ShopDetails',
  templateUrl: './ShopDetails.component.html',
  styleUrls: ['./ShopDetails.component.scss']
})

export class ShopDetailsComponent implements OnInit, OnChanges {

   @Input() detailData : any;
   @Input() currency   : string;

   
   @Input() contratista : any;
   contratoForm:FormGroup;
   
   mainImgPath   : any;
   totalPrice    : any;
   type          : any;
   colorsArray   : string[] = ["Red", "Blue", "Yellow", "Green"];
   sizeArray     : number[] = [36,38,40,42,44,46,48];
   quantityArray : number[] = [1,2,3,4,5,6,7,8,9,10];
   productReviews : any;
   contratistaDatos : any;
  

   constructor(private route: ActivatedRoute,
               private router: Router, 
               public embryoService : EmbryoService,
               private _formBuilder: FormBuilder
               ) {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => {this.productReviews = res});
   }

   ngOnInit() {
      this.createForm();
      this.mainImgPath = "assets/images/gadgets/g-2-a.jpg";
      
      // this.totalPrice  = this.detailData.price; 

      this.route.params.subscribe(res => {
         this.type = null;
         this.type = res.type; 
      });
   }

   ngOnChanges() {

      this.mainImgPath = "assets/images/gadgets/g-2-a.jpg";      
      this.totalPrice  = null;
      // this.mainImgPath = this.detailData.image;
      // this.totalPrice  = this.detailData.price; 
      this.totalPrice  = null; 

      this.contratistaDatos = this.contratista;
      console.log(this.contratistaDatos);
      
   }

   /**
    * getImagePath is used to change the image path on click event. 
    */
   public getImagePath(imgPath: string, index:number) {
      $('.p-link').removeClass('border-active');
      this.mainImgPath = imgPath;
      $("#"+index+"_img").addClass('border-active');
   }

   public calculatePrice(detailData:any, value: any) {
      detailData.quantity = value;
      this.totalPrice = detailData.price*value;
   }

   public reviewPopup(contratistaDatos) {
      let reviews : any = null;
      for(let review of this.productReviews) {
         // if((review.id == detailData.id) && (review.type == detailData.type) && (review.category == detailData.category)){
         //    singleProduct = review;
         //    break;
         // }

        reviews = review.user_rating;
      }

      this.embryoService.reviewPopup(contratistaDatos, reviews);
   }

   public addToWishlist(value:any) {
      this.embryoService.addToWishlist(value);
   }

   public addToCart(value:any) {
      this.embryoService.addToCart(value);
   }

   public buyNow(value:any) {
      this.embryoService.buyNow(value);
      this.router.navigate(['/checkout']);
   }

   // --------------------Contrato---------------
   prepareContrato(): ContratoModel {
		const controls = this.contratoForm.controls;
		const _contrato = new ContratoModel();
      _contrato.contratista_id = this.contratistaDatos.contratista.id;
      _contrato.user_id = this.contratistaDatos.contratista.user_id;
      _contrato.estado_id = 1;
      _contrato.descripcion = controls['descripcion'].value;
      _contrato.foto = 'por confirmar';

		return _contrato;
	}

   //crear nuevo contrato
   onSumit(){
      
      this.guardarContrato()

   }
   contratoGuardado:any;
   guardarContrato(){
      //guarda el contrato
      this.embryoService.createContrato(this.prepareContrato()).subscribe((res)=>{
         //poner mensaje de guardado
         alert("guardado");
      
   },error=>{
      //  swal('Error', 'Error al guardar contrato, por favor inténtelo nuevamente, error:'+error.message, 'warning');
      console.log(error);
      alert("error");
   })
   }

   get f() { return this.contratoForm.controls; }
	createForm() {
		this.contratoForm = this._formBuilder.group({
			descripcion:['',[Validators.required,Validators.maxLength(255)]]
		});
  }




}
