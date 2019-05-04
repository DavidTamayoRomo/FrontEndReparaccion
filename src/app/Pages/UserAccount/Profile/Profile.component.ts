import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastaService } from 'ngx-toasta';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioModel } from '../models/usuario.model';
import { RegistroModel } from '../models/registro.model';
import { LoginModel } from '../models/login.model';


@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //usuario:UsuarioModel;
  usuario:LoginModel;
  usuarioCompleto:UsuarioModel;
  
  type         : string;
  toastOption  : ToastOptions = {
    title     : "Eliminar usuario",
    msg       : "Usuario eliminado correctamente!",
    showClose : true,
    timeout   : 4000,
    theme     : "material"
 };
   constructor( private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastaService,
                private snackBar: MatSnackBar,
                public _usuarioService: UsuarioService) {

                  this.route.params.subscribe(params => {
                    this.route.queryParams.forEach(queryParams => {
                       this.type = queryParams['type'];
                    });   
                 });

                 //inicializao el usuario
                 this.usuarioCompleto = _usuarioService.usuarioCompleto;
                 
                console.log(this.usuarioCompleto.name);
                 

    }

   ngOnInit() {

   }
   
  //funcion para abriri un dialogo para eliminar usuario
   openDialog() {
    
      let snackBarRef  = this.snackBar.open('Esta seguro de Eliminar usuario', 'Eliminar', {
        duration: 4000,
        
      });
      //aqui verificamos que se dio click en el dialogo
      snackBarRef.onAction().subscribe(() => {
        console.log('Se dio click en eso!');
        //aqui se implementaria la funcion de eliminar usuario

        //mensaje de que se elimini correctamente el usuario
        this.router.navigate(['/account/profile']).then(()=>{
          this.toastyService.success(this.toastOption);
        });
      });
    }

   
}
