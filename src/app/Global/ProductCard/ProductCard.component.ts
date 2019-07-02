import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ListaContratistasModel } from '../../Pages/UserAccount/models/contratistaListar/listaContratistas.model';
import { AllContratistaService } from '../../Services/AllContratistas/all-contratista.service';
import { UsuarioService } from '../../Pages/UserAccount/services/usuario.service';
import { DataModel } from '../../Pages/UserAccount/models/contratistaListar/data.model';
import { ContratistasTipoTrabajoModel } from '../../Pages/UserAccount/models/contratistaListar/contratistasTipoTrabajo.model';
declare var $: any;

@Component({
  selector: 'embryo-ProductCard',
  templateUrl: './ProductCard.component.html',
  styleUrls: ['./ProductCard.component.scss']
})
export class ProductCardComponent implements OnInit, OnChanges {

   @Input() product : any;

   @Input() index   : any;

   @Input() currency : string;

   @Output() addToCart: EventEmitter<any> = new EventEmitter();

   @Output() addToWishlist: EventEmitter<any> = new EventEmitter();

   //modificacion
   contratistas:DataModel;
   contratistas1:ContratistasTipoTrabajoModel=null;
   @Input()trabajos:any;

   constructor(public _contratistasService : AllContratistaService,
               public _servicioUsuario:UsuarioService) { }

   ngOnInit() {
      
      //this.mostrarContratistasTiposDeTrabajo(1);
   }

   //a;ado
   ngOnChanges(){     
      this.contratistas=this.product; 
   }

}
