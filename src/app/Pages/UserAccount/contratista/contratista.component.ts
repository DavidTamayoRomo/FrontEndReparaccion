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

@Component({
  selector: 'app-contratista',
  templateUrl: './contratista.component.html',
  styleUrls: ['./contratista.component.scss']
})
export class ContratistaComponent implements OnInit {
  //material
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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;

  arrayPlanes:any[]=[];
  arrayTiposTrabajo:any[]=[];
  planes:any[]=[{plan:"premium",id:1},{plan:"free",id:2}]
  trabajos: string[] = ['Plomero'];
  allFruits: string[] = ['Plomero', 'Fontanero', 'Carpintero', 'Limpieza', 'Electricidad'];


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private _formBuilder: FormBuilder,private _contratistaService:ContratistaService) {
    //chips
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
   }

  ngOnInit() {
    this.createForm();
  }

  //******** valores necesarios para registro ******************
  getPlanes(){
    this._contratistaService.getPlanes().subscribe(res=>{
      this.arrayPlanes=res;
    },error=>{
      alert("ha ocurrido un error al obtener los planes");
    })
  }
  
  getTipoTrabajo(){
    this._contratistaService.getTiposTrabajo().subscribe(res=>{
      this.arrayTiposTrabajo=res;
    },error=>{
      alert("ha ocurrido un error al obtener los tipo de trabajo");
    })
  }

  //******* */valores necesarios para registro *****************

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

  guardarContratista(){
    console.log("click");
      this._contratistaService.createContratista(this.prepareContratista()).subscribe((res)=>{
      alert(res);
      console.log(res);
    },error=>{
      alert(error);
      console.log(error);
    })
  }

  //chips
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.trabajos.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.trabajos.indexOf(fruit);

    if (index >= 0) {
      this.trabajos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.trabajos.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


}



