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
   ncontratos         :any;

   

   constructor(private route: ActivatedRoute,
              private router: Router,
              public embryoService: EmbryoService) {
      
   }

   ngOnInit() {
      this.route.params.subscribe(res => {
         // console.log(res.id);
         // console.log(res.trabajo_id)
         if(res.trabajo_id!=undefined){
            this.tipotrabajo_id = res.trabajo_id;
            this.obtenerTrabajosPorID();
         }else{
            this.obtenerContratistas();
         }
         this.contratista_id=res.id;
         this.type = res.type;
         // this.getData();
         this.obtenerContratista();
         this.obtenerContratos();

      })
   }


   public obtenerContratista(){
      this.embryoService.getContratista(this.contratista_id).subscribe(res => {
         //console.log("Datos de contratista",res);
         this.contratista=res;
         this.contratista.contratista.tipotrabajos=res.contratista.tipotrabajos.filter(trabajo=>trabajo.id==this.tipotrabajo_id);
         //this.contratista.tiposTrabajo=res.tiposTrabajo.filter(trabajo=>trabajo.id!=this.tipotrabajo_id);
      });

   }
   public obtenerTrabajosPorID(){
      this.embryoService.getTrabajos(this.tipotrabajo_id).subscribe(res => {
         //console.log(res);
         this.trabajos=res;
         this.trabajos.contratistas=res.contratistas.filter(trabajo=>trabajo.id!=this.contratista_id);
      });
   }
   public obtenerContratistas(){
      this.embryoService.getContratistas().subscribe(res=>{
         //console.log(res);
         this.trabajos=res.data;
         
      });
   }


   public obtenerContratos(){
      this.embryoService.getContratos(this.contratista_id).subscribe(res => {
         // console.log("datos contratos antes de enviar al hijo",res);
         this.ncontratos=res;
         //console.log("datos contratos antes de enviar al hijo",this.ncontratos);
      });
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
