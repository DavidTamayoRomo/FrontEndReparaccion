import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UsuarioService } from '../../Pages/UserAccount/services/usuario.service';
import { UsuarioModel } from '../../Pages/UserAccount/models/usuario.model';
import { Router } from '@angular/router';
import { RegistroModel } from '../../Pages/UserAccount/models/registro.model';
import { LoginModel } from '../../Pages/UserAccount/models/login.model';
import swal from 'sweetalert';


declare const gapi:any;

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  form: FormGroup;
  auth2:any;
  usuarioCompleto:UsuarioModel;
  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit() {
    this.googleInit();

    this.form = new FormGroup({
      email: new FormControl( null ,[ Validators.required,, Validators.email] ),
      password: new FormControl( null , Validators.required )   
    })
  }
  
  //================================================
  //                     GOOGLE
  //================================================
  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id:'1035156116455-nkfi5u3ppti0j2au85tcto2kvjqd92b8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      //
      this.attachSingIn(document.getElementById('btnGoogle'));
    });
  }

  attachSingIn(elemet){
    this.auth2.attachClickHandler(elemet, {}, (googleUser)=>{
      let profile = googleUser.getBasicProfile();
      console.log(profile);
      console.log('ID: ' + profile.getId()); 
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); 
      /*let usuario = new UsuarioModel(
        null,
        profile.getName(),
        profile.getName(),
        profile.getEmail(),
        null,
        null,
        null,
        null,
        null
      );*/
      let usuario = new RegistroModel(
        profile.getName(),
        profile.getEmail(),
        null, 
        profile.getName(),
        profile.getTelefono(),
        profile.getDireccion(),

      );
      this._usuarioService.loginGoogle(usuario).subscribe(resp =>{
        console.log(resp);
        this.router.navigate(['/home']);
      });
    });
  }

  



  //================================================
  //                     NORMAL
  //================================================
  ingresarUsuario( forma: NgForm ){
    if(forma.invalid){
      return;
    }
      
    //console.log(forma.valid);
    //console.log(forma.value);

    let usuario = new LoginModel(
      forma.value.email,
      forma.value.password
    );
    

    this._usuarioService.login(usuario).subscribe();
  }

}
