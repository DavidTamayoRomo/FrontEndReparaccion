import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AllContratistaService } from '../../../Services/AllContratistas/all-contratista.service';
import { ListaContratistasModel } from '../../../Pages/UserAccount/models/contratistaListar/listaContratistas.model';
import { MatPaginator, PageEvent } from '@angular/material';


@Component({
  selector: 'embryo-ProductGrid',
  templateUrl: './ProductGrid.component.html',
  styleUrls: ['./ProductGrid.component.scss']
})
export class ProductGridComponent implements OnInit {
   
   contratistas:ListaContratistasModel;
   pageEvent: PageEvent;
    
   @ViewChild(MatPaginator) paginator: MatPaginator;

   constructor(public _contratistasService : AllContratistaService) {}

   ngOnInit() {
      this._contratistasService.getContratistas()
          .then(contratistas=>this.contratistas=contratistas);   
   }

  
  paginaActual;
  paginar(evento){
    this._contratistasService.getContratistasUrl1(evento.pageIndex+1)
      .then(contratistas=>this.contratistas=contratistas);        
  }
   
  

   
   anteriorPagina(){
    
    this._contratistasService.getContratistasUrl(this.contratistas.prev_page_url)
    .then(contratistas=>this.contratistas=contratistas);
      
    }
    siguientePagina(){
      this._contratistasService.getContratistasUrl(this.contratistas.next_page_url)
          .then(contratistas=>this.contratistas=contratistas);
    }

    

   

   

   

   

}
