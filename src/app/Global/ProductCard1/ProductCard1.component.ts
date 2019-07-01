import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ListaContratistasModel } from '../../Pages/UserAccount/models/contratistaListar/listaContratistas.model';
import { AllContratistaService } from '../../Services/AllContratistas/all-contratista.service';
import { UsuarioService } from '../../Pages/UserAccount/services/usuario.service';
import { DataModel } from '../../Pages/UserAccount/models/contratistaListar/data.model';
import { ContratistasTipoTrabajoModel } from '../../Pages/UserAccount/models/contratistaListar/contratistasTipoTrabajo.model';
import { AnuncioModel } from '../../Pages/UserAccount/models/anuncio.model';
declare var $: any;

@Component({
  selector: 'embryo-ProductCard1',
  templateUrl: './ProductCard1.component.html',
  styleUrls: []
})
export class ProductCardComponent1 implements OnInit, OnChanges {

   @Input() anuncio : any;

   @Input() index   : any;

   anuncios:AnuncioModel;
   
   constructor() { }

   ngOnInit() {  
      console.log(this.anuncio);
      this.anuncios=this.anuncio; 
   }

   ngOnChanges(){ 
      this.anuncios=this.anuncio; 
   }

   


}
