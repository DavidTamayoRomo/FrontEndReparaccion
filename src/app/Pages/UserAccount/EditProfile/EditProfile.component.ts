import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.scss']
})
export class EditProfileComponent implements OnInit {
   usuarioCompleto:UsuarioModel;
   
   type         : string;
   info         : FormGroup;
   address      : FormGroup;
   card         : FormGroup;
   emailPattern : any = /\S+@\S+\.\S+/;
   toastOption  : ToastOptions = {
      title     : "Informacion de cuenta",
      msg       : "Su informacion a sido actualizada correctamente!",
      showClose : true,
      timeout   : 3000,
      theme     : "material"
   };

   constructor(private route: ActivatedRoute,
               private router: Router,
               private formGroup : FormBuilder,
               private toastyService: ToastaService,
               public _usuarioService: UsuarioService) {

      this.route.params.subscribe(params => {
         this.route.queryParams.forEach(queryParams => {
            this.type = queryParams['type'];
         });   
      });

      //inicializao el usuario
      this.usuarioCompleto = _usuarioService.usuarioCompleto;
   }

   ngOnInit() {
      this.info = this.formGroup.group({
         name   : ['', [Validators.required]],
         username    : ['', [Validators.required]],
         email        : ['', [Validators.required, Validators.pattern(this.emailPattern)]]
      });
      
   }

   guardar( usuario: UsuarioModel ){
      this.usuarioCompleto.name=usuario.name;
      this.usuarioCompleto.username=usuario.username;
      this.usuarioCompleto.email=usuario.email;
      this.usuarioCompleto.telefono=usuario.telefono;
      this.usuarioCompleto.direccion=usuario.direccion;
      this.usuarioCompleto.ubicacion=usuario.ubicacion;
      this.usuarioCompleto.role_id=usuario.role_id;
      console.log(this.usuarioCompleto);
      this._usuarioService.actualizarUsuario(this.usuarioCompleto)
                          .subscribe(resp =>{
                              console.log(resp)
                          });
   }

   

   

}
