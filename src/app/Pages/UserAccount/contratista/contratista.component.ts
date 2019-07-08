import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ContratistaService} from '../services/contratista.service';
import{ContratistaModel} from '../models/contratista.model';
import{UsuarioModel} from '../models/usuario.model';

import {ContratistaTipoTrabajoModel} from '../models/contratistaTipoTrabajo.model';
import{UsuarioService} from '../services/usuario.service';
// import {ContratistaService} from '../services/ContratistaService';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';



@Component({
  selector: 'app-contratista',
  templateUrl: './contratista.component.html',
  styleUrls: ['./contratista.component.scss']
})
export class ContratistaComponent implements OnInit {
  //material
  usuarioCompleto:UsuarioModel;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  contratistaForm:FormGroup;
  //chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  trabajoCtrl = new FormControl();
  trabajosFiltrados: Observable<any[]>;

  arrayPlanes:any[]=[];
  arrayTiposTrabajo:any[]=[];
  planes:any[]=[{plan:"premium",id:1},{plan:"free",id:2}]
  trabajosSelecionados: any[] = [];
  // allFruits: string[] = ['Plomero', 'Fontanero', 'Carpintero', 'Limpieza', 'Electricidad'];

  Usuario:UsuarioModel;
  trabajoControl = new FormControl();
  // @ViewChild('trabajoInput') trabajoInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;
  contratista;

  constructor(private _formBuilder: FormBuilder,
    private _contratistaService:ContratistaService,
    private _usuarioService:UsuarioService,
    private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.Usuario=this._usuarioService.usuarioCompleto;
    this.createForm();
    this.getPlanes();
    this.getTipoTrabajo();
    //iniciar escucha en input de trabajos
     this.trabajosFiltrados = this.trabajoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

//obtencion de parametros de la url actual
  if(this.activatedRoute.snapshot.params.opcion){
    this.obtenerContratista()
  }
   
  }
    
  obtenerContratista(){
    this._contratistaService.getContratistaLogueado().subscribe(res=>{
      console.log(res);
      this.contratista=res.contratista[0];
      this.contratistaForm.patchValue({
        plan_id: this.contratista.plan_id,
        descripcion:this.contratista.descripcion
      });

      this.trabajosSelecionados=res.trabajos;

    },error=>{
      swal('Error', 'Error al obtener los datos de contratista, por favor recarge nuevamente la página, error:'+error.message, 'warning');
    })
  }


  //******** valores necesarios para registro ******************
  getPlanes(){
    this._contratistaService.getPlanes().subscribe(res=>{
      this.arrayPlanes=res;
      console.log("arrayplanes",this.arrayPlanes);
    },error=>{
      swal('Error', 'Error al obtener los planes, por favor recarge nuevamente la página, error:'+error.message, 'warning');
    })
  }
  
  getTipoTrabajo(){
    this._contratistaService.getTiposTrabajo().subscribe(res=>{
      this.arrayTiposTrabajo=res;
      console.log(this.arrayTiposTrabajo);
    },error=>{
      swal('Error', 'Error al obtener los trabajos, por favor recarge nuevamente la página, error:'+error.message, 'warning');
    })
  }
  //******* */valores necesarios para registro *****************

  
  

  get f() { return this.contratistaForm.controls; }
	createForm() {
		this.contratistaForm = this._formBuilder.group({
			plan_id: [2, Validators.required],
			descripcion:['',[Validators.required,Validators.maxLength(255)]]
		});
  }
  
  prepareContratista(): ContratistaModel {
		const controls = this.contratistaForm.controls;
		const _contratista = new ContratistaModel();
		_contratista.plan_id = controls['plan_id'].value;
    _contratista.descripcion = controls['descripcion'].value;
    this._usuarioService.obtenerUsuario();
    _contratista.user_id = this._usuarioService.usuarioCompleto.id;
    if(this.contratista){
      _contratista.id=this.contratista.id;
    }
		return _contratista;
	}

  //crear nuevo contratista
  seleccionar(id){
    this.contratistaForm.patchValue({"plan.id":id})
    console.log(id);

  }
  onSumit(){
    if(this.contratista){
      this.updateContratista();
    }else{
      console.log("nueevo");
      this.guardarContratista()
    }

  }
  

  contratistaGuardado:any;
  guardarContratista(){
      //guarda el contratista
      this._contratistaService.createContratista(this.prepareContratista()).subscribe((res)=>{
        //una vez guardado se guardan sus areas
      this.contratistaGuardado=res;
      this.guardarAreas(this.contratistaGuardado.id);
      console.log(res);
    },error=>{
      swal('Error', 'Error al guardar contratista, por favor inténtelo nuevamente, error:'+error.message, 'warning');
      console.log(error);
    })
  }
  guardarAreas(idcontratista){
    // prepearar datos
    console.log(this.trabajosSelecionados);
    let idsTrabajos:any []=[];
    this.trabajosSelecionados.forEach(trabajo=>{
      idsTrabajos.push(trabajo.id);
    })

    this._contratistaService.createContratistaTipoTrabajo(new ContratistaTipoTrabajoModel(idcontratista,idsTrabajos)).subscribe((res)=>{
          console.log(res);
          swal('Éxito', 'Contratista registrado correctamente', 'success');
        },error=>{
          console.log(error);
          swal('Error', 'Error al guardar los trabajos, por favor inténtelo nuevamente, error:'+error.message, 'warning');
        })
        
  }
 
  remove(indice: number): void {
    console.log(indice);
    console.log(this.trabajosSelecionados);
    console.log(this.trabajosSelecionados[indice]);
    this.trabajosSelecionados.splice(indice,1);
  }

//**************logica del autocomplete
  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value)
    this.trabajosSelecionados.push(event.option.value);
    this.trabajoControl.setValue(null);
  }

  private _filter(value): any[] {
    if(value){
      if(typeof(value)==="object"){
        const filterValue = value.nombre.toLowerCase();
        return this.arrayTiposTrabajo.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
      }else{
      const filterValue = value.toLowerCase();
      return this.arrayTiposTrabajo.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
      }
    }else{
      return this.arrayTiposTrabajo;
    }
  }

  //actualizacion de contratista **********

  updateContratista(){
    //guarda el contratista
    this._contratistaService.updateContratista(this.prepareContratista()).subscribe((res)=>{
    this.updateAreas(this.contratista.id);
    console.log(res);
  },error=>{
    swal('Error', 'Error al actualizar contratista, por favor inténtelo nuevamente, error:'+error, 'warning');
    console.log(error.message);
  })
}
updateAreas(idcontratista){
  let idsTrabajos:any []=[];
    this.trabajosSelecionados.forEach(trabajo=>{
      idsTrabajos.push(trabajo.id);
    })

    this._contratistaService.updateContratistaTipoTrabajo(new ContratistaTipoTrabajoModel(idcontratista,idsTrabajos)).subscribe((res)=>{
      swal('Éxito', 'Contratista actualizado correctamente', 'success');
    },error=>{
      console.log(error.message);
      swal('Error', 'Error al actualizar los trabajos, por favor inténtelo nuevamente, error:'+error, 'warning');
    })
}
  
}







