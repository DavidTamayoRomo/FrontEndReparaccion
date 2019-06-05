import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Pages/UserAccount/services/usuario.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../Pages/UserAccount/models/usuario.model';

@Component({
  selector: 'embryo-HeaderUserProfileDropdown',
  templateUrl: './HeaderUserProfileDropdown.component.html',
  styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {
  usuarioCompleto:UsuarioModel;
  mostrar:boolean;
  mostrar1:boolean;
   constructor(public router: Router,public _servicioUsuario:UsuarioService) { }

   ngOnInit() {
    this.verificarUsuarioLogeado();
   }

  
   salirUsuario(){
    //carga el modelo con los datos del localstorage
    //get Item recupera un valor mediante la clave de LocalStorage
   this.usuarioCompleto = JSON.parse( localStorage.getItem('usuario1') );
    //del servicio se llama a la funcion para enviarle los datos  y se suscribe cuando envia la respuesta
    this._servicioUsuario.logoutUsuario(this.usuarioCompleto).subscribe(resp=>{
      //redirecciona al login
      window.location.href = '/session/signin'
     
    });
  }

  verificarUsuarioLogeado(){

    this.usuarioCompleto = JSON.parse( localStorage.getItem('usuario1') );
    if(this.usuarioCompleto == null){
      //no esta logeado
      this.mostrar=false;//usuario  logeado
      this.mostrar1=true;//usuario no Logeado
    }else{
      this.mostrar=true;//usuario  logeado
      this.mostrar1=false;//usuario no Logeado
    }
    console.log("este es el verificar usuario");
    console.log(this.mostrar);
    console.log(this.mostrar1);
  }
  


}
