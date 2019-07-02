import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

import { EmbryoService } from '../../../Services/Embryo.service';
import { tipodeTrabajoModel } from '../../UserAccount/models/contratistaListar/tipodeTrabajo.model';
import { AllContratistaService } from '../../../Services/AllContratistas/all-contratista.service';
import { FormControl } from '@angular/forms';
import { tipoTrabajoService } from '../../../Services/tipoTrabajo.service';
import { ContratistasTipoTrabajoModel } from '../../UserAccount/models/contratistaListar/contratistasTipoTrabajo.model';
import { ListaContratistasModel } from '../../UserAccount/models/contratistaListar/listaContratistas.model';
import { AnuncioModel } from '../../UserAccount/models/anuncio.model';

@Component({
  selector: 'app-homeone',
  templateUrl: './HomeOne.component.html',
  styleUrls: ['./HomeOne.component.scss']
})
export class HomeoneComponent implements OnInit, AfterViewChecked{

   tipos:tipodeTrabajoModel;
   contratistas:ContratistasTipoTrabajoModel=null;
   anuncios:AnuncioModel;

   selected = new FormControl(0);

   blogList              : any;
   productReviews        : any;
   productsArray         : any;
   productsSliderData    : any;
   newProductsSliderData : any;

   slideConfig = {
      slidesToShow: 4,
      slidesToScroll:4,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               arrows: false,
               slidesToShow: 2,
               slidesToScroll:1
            }
         },
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               slidesToShow: 2,
               slidesToScroll:2
            }
            },
         {
            breakpoint: 480,
            settings: {
               arrows: false,
               slidesToShow: 1,
               slidesToScroll:1
            }
         }
      ]
   };

   

   constructor(public embryoService: EmbryoService,
               private cdRef : ChangeDetectorRef,
               public _contratistasService : AllContratistaService,
               public _tipoTrabajoService : tipoTrabajoService) {
      this.getFeaturedProducts();
      this.getBlogList();
      this.getProductRevies();

      this.embryoService.featuredProductsSelectedTab = 0;
      this.embryoService.newArrivalSelectedTab = 0;
   }

   ngOnInit() {
      this.mostrarTiposDeTrabajo();
      let myNumeroAleatorio = Math.floor(Math.random()*(4+1));
      if(myNumeroAleatorio==0){
         myNumeroAleatorio+=1;
      }
      
      this.mostrarContratistasTiposDeTrabajo(myNumeroAleatorio);

      this. mostrarAnuncios();
   }

   //===============================================================
   //                       Anuncios 
   //===============================================================
   mostrarAnuncios(){
      this._contratistasService.getAnuncios()
      .subscribe(anuncios=>{
        this.anuncios=anuncios
        //console.log(this.anuncios);
      }); 
   }

   //===============================================================
   //               Contratistas por  tipo de trabajo
   //===============================================================
   mostrarContratistasTiposDeTrabajo(num){
      this._contratistasService.getContratistasUrlTipoTrabajo(num)
      .subscribe(contratistas=>{
        this.contratistas=contratistas
        //console.log(this.contratistas);
      });  
    }

   //===============================================================
   //                    Todos los tipos de trabajo
   //===============================================================
   mostrarTiposDeTrabajo(){
      this._tipoTrabajoService.getTipoTrabajos()
      .then(tipos=>this.tipos=tipos);  
   }


//me devuelve el numero de index del TAB
//es decir obtengo el id de tipo de trabajo
   tabChanged(event) {
      //console.log('Clicked: ' + event.index);
      if( event.index >0 ){
         this.mostrarContratistasTiposDeTrabajo( event.index);
      }
      if(event.index == 0){
         //todos los trabajos
         
      }
      
  }

   
   ngAfterViewChecked() : void {
      this.cdRef.detectChanges();
   }

   public getFeaturedProducts() {
      this.embryoService.getProducts().valueChanges().subscribe(res => {this.productsArray = res});
   }

   public getBlogList() {
      this.embryoService.getBlogList().valueChanges().subscribe(res => {this.blogList = res});
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public getProductRevies() {
      this.embryoService.getProductReviews().valueChanges().subscribe(res => {this.productReviews = res});
   }

   public addToWishlist(value) {
      this.embryoService.addToWishlist(value);
   }

   public onFeaturedSelectedTab(tabIndex) {
      this.productsSliderData = null;
      switch (tabIndex) {
         case 0:
            this.productsSliderData = this.productsArray.men;
         break;

         case 1:
            this.productsSliderData = this.productsArray.women;
         break;

         case 2:
            this.productsSliderData = this.productsArray.gadgets;
         break;

         case 3:
            this.productsSliderData = this.productsArray.accessories;
         break;
         
         default:
            // code...
            break;
      }

      return true;
   }

   public onNewArrivalsSelectedTab(tabIndex) {
      this.newProductsSliderData = null;
      switch (tabIndex) {
         case 0:
            this.newProductsSliderData = this.productsArray.men;
         break;

         case 1:
            this.newProductsSliderData = this.productsArray.women;
         break;

         case 2:
            this.newProductsSliderData = this.productsArray.gadgets;
         break;

         case 3:
            this.newProductsSliderData = this.productsArray.accessories;
         break;
         
         default:
            // code...
            break;
      }

      return true;
   }
}
