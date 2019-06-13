import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Marcador } from './marcador.model';

@Component({
  selector: 'app-ReviewPopup',
  templateUrl: './ReviewPopup.component.html',
  styleUrls: ['./ReviewPopup.component.scss'] 
})
export class ReviewPopupComponent implements OnInit {

  marcadores: Marcador[] = [];
  
   singleProductDetails : any;
   reviews : any;
   
  lat = 51.678418;
  lng = 7.809007;
   constructor(public dialogRef: MatDialogRef<ReviewPopupComponent>) { }

   ngOnInit() {
   }

   agregarMarcador( evento ) {

    const coords: { lat: number, lng: number } = evento.coords;

    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
     if(this.marcadores.length==0){
      this.marcadores.push( nuevoMarcador );
      this.guardarStorage();
    }

  }

  borrarMarcador( i: number ) {

    this.marcadores.splice(i, 1);
    this.guardarStorage();
    
  }

  aceptarModal(){
    this.dialogRef.close(this.marcadores[0])
  }

  guardarStorage() {

    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ) );

  }

   

}
