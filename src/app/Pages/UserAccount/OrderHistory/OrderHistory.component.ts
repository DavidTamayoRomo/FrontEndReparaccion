import { Component, OnInit } from '@angular/core';
import { ContratistaService } from '../services/contratista.service';
import { AllContratistaService } from '../../../Services/AllContratistas/all-contratista.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {
   displayedColumns: string[] = ['id', 'descripcion','estado','costo','actions'];
   dataSource :any[]=[]
   contratista:any;

   constructor(private _contratistaService:ContratistaService,
               private _usuarioService:UsuarioService,
               public _contratistasService : AllContratistaService) {
              
                  
               }

   
   ngOnInit() {
   //   this._contratistaService.getContratistaLogueado().subscribe(res=>{
   //      this.contratista=res;
   //      this.mostrarContratistas();
   //   },error=>{
   //      alert('error');
   //   })
      this.getContratosUsuario();
   }

   aceptarOferta(contrato){
      let contrat=contrato;
      delete contrat.updated_at;
      delete contrat.created_at;
      //estado 2 en progreso 
      contrat.estado_id=2;

      this._usuarioService.updateContrato(contrat).subscribe(res=>{
         this.getContratosUsuario()

      })
   }
   rechazarOferta(contrato){
      let contrat=contrato;
      delete contrat.updated_at;
      delete contrat.created_at;
      contrat.estado_id=4;
      this._usuarioService.updateContrato(contrat).subscribe(res=>{
         this.getContratosUsuario()

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

   /////////////////////////////////////////////////////
   public getContratosUsuario(){
      this._usuarioService.obtenerUsuario();
      this._usuarioService.getContratosUsuario(this._usuarioService.usuarioCompleto.id).subscribe(res => {
         this.dataSource=res.contratos;
         console.log("Datos de contratos",res);
      });

   }

  

}



   


