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
   
  lat:number;
  lng:number;
   constructor(public dialogRef: MatDialogRef<ReviewPopupComponent>) { }

   ngOnInit() {
    this.ubicacion();
   }

   ubicacion(){
    var options = {
      enableHighAccuracy: true,
      timeout: 6000,
      maximumAge: 0
    };
  
    navigator.geolocation.getCurrentPosition( (success:any) =>{
      console.log(success.coords)
      this.lat=success.coords.latitude;
      this.lng=success.coords.longitude;
      
    }, error=>{
        console.log(error);
    }, options );
    
  }

  agregarMarcador( evento ) {

    const nuevoMarcador = new Marcador( evento.coords.lat, evento.coords.lng );
     if(this.marcadores.length==0){
      this.marcadores.push( nuevoMarcador );
  
    }

  }

  borrarMarcador( i: number ) {

    this.marcadores.splice(i, 1);
    
    
  }

  aceptarModal(){
    this.dialogRef.close(this.marcadores[0])
  }



  

  

   

}