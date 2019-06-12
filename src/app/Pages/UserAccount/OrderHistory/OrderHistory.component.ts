import { Component, OnInit } from '@angular/core';
import { ContratistaService } from '../services/contratista.service';
import { AllContratistaService } from '../../../Services/AllContratistas/all-contratista.service';



@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {
   displayedColumns: string[] = ['id', 'descripcion','estado','costo','ubicacion'];
   dataSource :any[]=[]
   contratista:any;

   constructor(private _contratistaService:ContratistaService,
               public _contratistasService : AllContratistaService) {
              
                  
               }

   
   ngOnInit() {
     this._contratistaService.getContratistaLogueado().subscribe(res=>{
        this.contratista=res;
        this.mostrarContratistas();
     },error=>{
        alert('error');
     })

     
     
   }
   
   //===============================================================
   //                    Todos los contratis
   //===============================================================
   mostrarContratistas(){
      this._contratistasService.contratosContratistas(this.contratista.contratista[0].id)
      .subscribe((res:any)=>{
         this.dataSource=res.contratos;
         console.log(this.dataSource);
      },error=>{
         alert("Error");
      });  
   }

   
   

}
