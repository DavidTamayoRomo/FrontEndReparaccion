import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
declare var $: any;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {EmbryoService } from '../../Services/Embryo.service';
import { ContratoModel } from '../../Pages/Products/DetailPage/models/contrato.model';
import { UsuarioService} from '../../Pages/UserAccount/services/usuario.service';

import swal from 'sweetalert';

@Component({
  selector: 'embryo-ShopDetails',
  templateUrl: './ShopDetails.component.html',
  styleUrls: ['./ShopDetails.component.scss']
})

export class ShopDetailsComponent implements OnInit, OnChanges {

   @Input() detailData : any;
   @Input() currency   : string;

   
   @Input() contratista : any;
   @Input() ncontratos : any;
   contratoForm:FormGroup;
   
   mainImgPath   : any;
   totalPrice    : any;
   type          : any;
   colorsArray   : string[] = ["Red", "Blue", "Yellow", "Green"];
   sizeArray     : number[] = [36,38,40,42,44,46,48];
   quantityArray : number[] = [1,2,3,4,5,6,7,8,9,10];
   productReviews : any;
   contratistaDatos : any;
   ncontratosDatos : any;
   ubicacion:any;
  

   constructor(private route: ActivatedRoute,
               private router: Router, 
               public embryoService : EmbryoService,
               public UsuarioService : UsuarioService,
               private _formBuilder: FormBuilder
               ) {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => {this.productReviews = res});
   }

   ngOnInit() {
      this.createForm();
      this.contratistaDatos = this.contratista;
      this.mainImgPath = "http://localhost/reparaccion//storage/"+this.contratistaDatos.contratista.user.avatar;
      
      // this.totalPrice  = this.detailData.price; 

      this.route.params.subscribe(res => {
         this.type = null;
         this.type = res.type; 
      });
      this.UsuarioService.obtenerUsuario();
   }

   ngOnChanges() {

            
      this.totalPrice  = null;
      // this.mainImgPath = this.detailData.image;
      // this.totalPrice  = this.detailData.price; 
      this.totalPrice  = null; 

      //importando datos de contratista y de contratos
      this.contratistaDatos = this.contratista;
      //console.log("contratistass",this.contratistaDatos);
      this.ncontratosDatos = this.ncontratos;
      //console.log("numerocontratos",this.ncontratosDatos);
      this.mainImgPath = "http://localhost/reparaccion//storage/"+this.contratistaDatos.contratista.user.avatar;
      
    

      
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

      this.embryoService.reviewPopup(contratistaDatos, reviews).subscribe(res=>{
         this.ubicacion=res;
         console.log(res);   
      });
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
      _contrato.user_id = this.UsuarioService.usuarioCompleto.id;
      _contrato.estado_id = 1;
      _contrato.descripcion = controls['descripcion'].value;
      _contrato.foto = 'por confirmar';
      _contrato.ubicacion=JSON.stringify(this.ubicacion);
      console.log(_contrato);

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
         swal('Éxito', 'Contrato creado correctamente', 'success');
        // alert("guardado");
      
   },error=>{
    swal('Error', 'Error al guardar contrato, por favor inténtelo nuevamente', 'warning');
      //console.log(error);
      //alert("error");
   })
   }

   get f() { return this.contratoForm.controls; }
	createForm() {
		this.contratoForm = this._formBuilder.group({
			descripcion:['',[Validators.required,Validators.maxLength(255)]]
		});
  }




}
