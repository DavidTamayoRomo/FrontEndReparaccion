import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { tipoTrabajoService } from '../../Services/tipoTrabajo.service';
import { tipodeTrabajoModel } from '../UserAccount/models/contratistaListar/tipodeTrabajo.model';
import { MatRadioChange, MatRadioButton } from '@angular/material';
import { AllContratistaService } from '../../Services/AllContratistas/all-contratista.service';

import { ContratistasTipoTrabajoModel } from '../UserAccount/models/contratistaListar/contratistasTipoTrabajo.model';


@Component({
  selector: 'app-lista-contratista',
  templateUrl: './lista-contratista.component.html',
  styleUrls: ['./lista-coontratista.component.scss']
})
export class ListaContratistaComponent implements OnInit {
  tipos:tipodeTrabajoModel;
  contratistas:any=[];
  
  


  @Output()
  change: EventEmitter<MatRadioChange> 
  

  constructor(public _tipoTrabajoService : tipoTrabajoService,
              public _contratistasService : AllContratistaService) {
      
   }

  ngOnInit() {
    this.mostrarTiposDeTrabajo();
    
  }
   //===============================================================
  //buscar tipo de trabajo
   //===============================================================
  buscar(valor){
    this.mostrarContratistaNombre(valor);
  }


  onChange(mrChange: MatRadioChange) {
    let mrButton: MatRadioButton = mrChange.source;   
    this.mostrarContratistasTiposDeTrabajo(mrChange.value); 
  } 
  //todos los trabajos
  onChange1(mrChange: MatRadioChange) {
    let mrButton: MatRadioButton = mrChange.source;   
    this._contratistasService.getContratistas()
          .then(contratistas=>this.contratistas=contratistas); 
  } 
  //===============================================================
   //                    Todos los tipos de trabajo
   //===============================================================
  mostrarTiposDeTrabajo(){
      this._tipoTrabajoService.getTipoTrabajos()
      .then(tipos=>this.tipos=tipos);  
  }

  //===============================================================
   //               Contratistas por  tipo de trabajo
   //===============================================================
  mostrarContratistasTiposDeTrabajo(num){
    this._contratistasService.getContratistasUrlTipoTrabajo(num)
    .subscribe(contratistas=>{
      this.contratistas=contratistas
      console.log(this.contratistas);
    });  
  }


  //===============================================================
   //               Contratistas por  nombre busqueda
   //===============================================================
   mostrarContratistaNombre(nombre){
    this._contratistasService.getContratistasNombre(nombre)
      .then(contratistas=>this.contratistas=contratistas);  
  }
 

}



 
