import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.scss']
})
export class EditProfileComponent implements OnInit {
   userAvatar:string;
  
   environmentThis = environment;
   usuarioCompleto:UsuarioModel;
   selectedFile: File = null;
   localUrl: any;
   
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
               private enviandoImagen: UsuarioService,
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
   cargandoImagen(event) {
      this.selectedFile = <File>event.target.files[0];
   }

   showPreviewImage(event: any) {
      if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
         reader.onload = (event: any) => {
            ///UrlProvicional
            this.localUrl = event.target.result;
            console.log(this.localUrl);
         }
         reader.readAsDataURL(event.target.files[0]);
      }
   }


   ngOnInit() {
      this.userAvatar="http://localhost/reparaccion//storage/app/public/"+this.usuarioCompleto.avatar;
      this.info = this.formGroup.group({
         name   : ['', [Validators.required]],
         username    : ['', [Validators.required]],
         email        : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
         avatar: ['', [Validators.required]],
         telefono: ['', [Validators.required]],
         direccion: ['', [Validators.required]]
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
      
      console.log('campo avatar', this.selectedFile);
      // this.usuarioCompleto.avatar=this.info.controls.avatar.value;
      // console.log('form',this.info.value);
      const f = new FormData();
      f.append('avatar', this.selectedFile, this.selectedFile.name);
      console.log(this.usuarioCompleto);

      this._usuarioService.actualizarUsuario(this.usuarioCompleto)
                          .subscribe(resp =>{
                           console.log("Peticion realizada");
                              console.log(resp);
                              this._usuarioService.subirFoto(f,this.usuarioCompleto.id)
                              .subscribe(resp => {
                              this.router.navigate(['/account/profile']);
                              
                          });
                        });
   }

   

   

}
