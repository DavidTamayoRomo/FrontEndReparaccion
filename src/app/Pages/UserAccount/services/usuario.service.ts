import { Injectable } from '@angular/core';
import{environment} from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './../../../utils/http-utils.service';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { RegistroModel } from '../models/registro.model';
import { LoginModel } from '../models/login.model';
const URL=environment.url1;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	//usuario:UsuarioModel;
	usuario:LoginModel;
	usuarioCompleto:UsuarioModel;
	

  constructor( public http: HttpClient ) { 
		console.log('Se esta usando el Servicio de Usuario');
		this.usuarioCompleto = JSON.parse( localStorage.getItem('usuario1') );
	}

	//====================================================
	//						LocalStorage
	//====================================================
	obtenerUsuario(){
		this.usuarioCompleto = JSON.parse( localStorage.getItem('usuario1') );
	}
	guardarStorage( usuario: UsuarioModel ) {
		console.log(usuario);
		localStorage.setItem('usuario1', JSON.stringify(usuario) );
		this.usuarioCompleto = usuario;
	  } 

	  //Para eliminar 
	  borrarStorage() {
		//El modelo usuario se iguala a null para que no quede cargado los datos
		this.usuarioCompleto=null;
		this.usuario=null;
		//Elimina el usuario del localstorage(almacenamiento local),elimina un elemento por clave de LocalStorage
		localStorage.removeItem('usuario1');
	  }

	//====================================================

	//====================================================
	//ingresar - login - singin
	//====================================================
	login( usuario:LoginModel ){
		let url = URL+'loginAPI';
		return this.http.post(url, usuario)
			.map( (resp: any) => {
				console.log(resp);
				this.guardarStorage( resp );
				//aki esta de modificar el siempre true
				return true;
		  	});
		
	}

	//==================================
	//login GOOGLE
	//==================================
	loginGoogle( usuario:RegistroModel ){
		
		let url = URL+'userap';
		
		return this.http.post(url, usuario);
		
	}


	//==================================	
	//			crear usuario
	//=================================
	crearUsuario( usuario:RegistroModel ){
		let url = URL+'userap';
		//se regresara un observado para poder suscribir la peticion
		return this.http.post(url,usuario);
	}
		
	//obtener usuario
	
	//==================================
	//			Actualizar usuario
	//==================================
	actualizarUsuario( usuario:UsuarioModel ){
		let url = URL+'user/edit-userap?api_token='+usuario.api_token;	
		return this.http.put(url, usuario).map( (resp: any) => {
			this.guardarStorage( resp );
		  });;
	}

	//==================================
	//logout Usuario
	//==================================
	logoutUsuario( usuario: UsuarioModel ){
		//llenar el modelo con los datos del localstorage(almacenamiento local)
		this.usuarioCompleto = usuario;
		//crear ruta con el token, el api se encarga de cifrar el token(valor randomico incriptado)
		let url = URL+'logoutAPI?api_token='+this.usuarioCompleto.api_token;
		//realiza la peticion map recibe la respuesta
		return this.http.get(url).map(resp => {
			
			this.borrarStorage();

		});
		
	}
}
