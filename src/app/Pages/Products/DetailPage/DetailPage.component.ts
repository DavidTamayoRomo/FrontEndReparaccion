import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params }   from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';

@Component({
  selector: 'app-DetailPage',
  templateUrl: './DetailPage.component.html',
  styleUrls: ['./DetailPage.component.scss']
})
export class DetailPageComponent implements OnInit {

   contratista_id    : any;
   tipotrabajo_id    : any;
   type              : any;
   apiResponse       : any;
   singleProductData : any;
   productsList      : any;
   contratista       : any;
   trabajos          : any;
   contratos         :any;

   

   constructor(private route: ActivatedRoute,
              private router: Router,
              public embryoService: EmbryoService) {
      
   }

   ngOnInit() {
      this.route.params.subscribe(res => {
         console.log(res.id);
         console.log(res.trabajo_id)
         this.contratista_id=res.id;
         this.tipotrabajo_id = res.trabajo_id;
         this.type = res.type;
         this.getData();
         this.obtenerContratista();
         this.obtenerTrabajos();
         this.obtenerContratos();

      })
   }


   public obtenerContratista(){
      this.embryoService.getContratista(this.contratista_id).subscribe(res => {
         console.log("Datos de contratista",res);
         this.contratista=res;
         this.contratista.contratista.tipotrabajos=res.contratista.tipotrabajos.filter(trabajo=>trabajo.id==this.tipotrabajo_id);
         this.contratista.tiposTrabajo=res.tiposTrabajo.filter(trabajo=>trabajo.id!=this.tipotrabajo_id);
      });

   }
   public obtenerTrabajos(){
      this.embryoService.getTrabajos(this.tipotrabajo_id).subscribe(res => {
         console.log(res);
         this.trabajos=res;
         this.trabajos.contratistas=res.contratistas.filter(trabajo=>trabajo.id!=this.contratista_id);
      });
   }


   public obtenerContratos(){
      this.embryoService.getContratos(this.contratista_id).subscribe(res => {
         console.log("datos contratos",res);
         this.contratos=res;
         this.contratos.contratos=res.contratos.filter(contrato=>contrato.id==this.contratista_id);
         console.log("datos contrato111",this.contratos.contratos);
      });
   }
   




   public getData() {
      this.embryoService.getProducts().valueChanges().subscribe(res => this.checkResponse(res));
   }

   public checkResponse(response) {
      this.productsList = null;
      this.productsList = response[this.type];
      for(let data of this.productsList)
      {
         if(data.contratista_id == this.contratista_id) {
            this.singleProductData = data;
            break;
         }
      }
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value) {
      this.embryoService.addToWishlist(value);
   }

}
