import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl,FormArray } from '@angular/forms';
import { ToastOptions, ToastaService } from 'ngx-toasta';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { UsuarioService } from '../../UserAccount/services/usuario.service';
import { UsuarioModel } from '../../UserAccount/models/usuario.model';
import { RegistroModel } from '../../UserAccount/models/registro.model';



@Component({
  selector: 'embryo-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit {
  info1  : FormGroup;
  
  
  constructor( public router: Router,
               public _usuarioService: UsuarioService) { 

  }

  ngOnInit() {
    this.info1 = new FormGroup({
      name: new FormControl( null , Validators.required ),
      username: new FormControl( null , Validators.required ),
      email: new FormControl( null ,[ Validators.required,, Validators.email] ),
      password: new FormControl( null , Validators.required ),
      pwd: new FormControl( null , Validators.required ),
      //telefono: new FormControl( null , Validators.required ),
      //direccion: new FormControl( null , Validators.required ),
      //ubicacion: new FormControl( null , Validators.required )
    }, { validators: this.sonIguales( 'password', 'pwd' )  } )

    
  }

  registrarUsuario(){
    if(this.info1.invalid){
      //si el formulario es invalido no hacer nada
      swal('Importante', 'Datos incorrectos', 'warning');
      return;
    }
    swal('Correcto', 'Datos registrados correctamente', 'success');
    console.log('Forma Valida',this.info1.valid);
    console.log(this.info1.value);

    //instanciamos el modelo del usuario
    /*let usuario = new UsuarioModel(
      null,
      this.info1.value.name,
      this.info1.value.username,
      this.info1.value.email,
      this.info1.value.password,
      this.info1.value.telefono,
      this.info1.value.direccion,
      this.info1.value.ubicacion,
      null
    );*/
    let usuario = new RegistroModel(
      this.info1.value.name,
      this.info1.value.email,
      this.info1.value.password, 
      this.info1.value.username
    );
    this._usuarioService.crearUsuario(usuario)
          .subscribe(resp => {
              console.log(resp);//respuesta del servidor
              this.router.navigate(['/session/signin']);
          });
  }
  
  


  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };

  }



}
