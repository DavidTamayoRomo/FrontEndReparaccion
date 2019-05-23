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
import {ContratistaTipoTrabajoModel} from '../models/contratistaTipoTrabajo.model';
import { UsuarioModel } from '../models/usuario.model';

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

  trabajoControl = new FormControl();
  // @ViewChild('trabajoInput') trabajoInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private _formBuilder: FormBuilder,private _contratistaService:ContratistaService) {
    
   }

  ngOnInit() {
    this.createForm();
    this.getPlanes();
    this.getTipoTrabajo();
    //iniciar escucha en input de trabajos
     this.trabajosFiltrados = this.trabajoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  //******** valores necesarios para registro ******************
  getPlanes(){
    this._contratistaService.getPlanes().subscribe(res=>{
      this.arrayPlanes=res;
      console.log(this.arrayPlanes);
    },error=>{
      alert("ha ocurrido un error al obtener los planes");
    })
  }
  
  getTipoTrabajo(){
    this._contratistaService.getTiposTrabajo().subscribe(res=>{
      this.arrayTiposTrabajo=res;
      console.log(this.arrayTiposTrabajo);
    },error=>{
      alert("ha ocurrido un error al obtener los tipo de trabajo");
    })
  }
  //******* */valores necesarios para registro *****************

  guardarAreas(){
    
    this.trabajosSelecionados.forEach(trabajo=>{
      this._contratistaService.createContratistaTipoTrabajo(new ContratistaTipoTrabajoModel(1,trabajo.id)).subscribe((res)=>{
        console.log(res);
      },error=>{
        console.log(error);
        alert(error);
      })
    })

    // this._contratistaService.createContratistaTipoTrabajo()

  }

  

  get f() { return this.contratistaForm.controls; }
	createForm() {
		this.contratistaForm = this._formBuilder.group({
			plan_id: [2, Validators.required],
			descripcion:['',Validators.maxLength(255)]
		});
  }
  
  prepareContratista(): ContratistaModel {
		const controls = this.contratistaForm.controls;
		const _contratista = new ContratistaModel();
		_contratista.plan_id = controls['plan_id'].value;
		_contratista.descripcion = controls['descripcion'].value;
		_contratista.user_id = 1;
		return _contratista;
	}

  idContratista:number;
  guardarContratista(){
    console.log("click");
      this._contratistaService.createContratista(this.prepareContratista()).subscribe((res)=>{
      // alert(res);
      this.idContratista=res.id;
      console.log(res);
    },error=>{
      alert(error);
      console.log(error);
    })
  }

 
  remove(indice: number): void {
    console.log(indice);
    this.trabajosSelecionados.splice(indice,1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
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
}



