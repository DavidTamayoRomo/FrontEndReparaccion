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
	guardarStorage( usuario: UsuarioModel ) {
		console.log(usuario);
		localStorage.setItem('usuario1', JSON.stringify(usuario) );
		this.usuarioCompleto = usuario;
	  }

	//====================================================

	//ingresar - login - singin
	login( usuario:LoginModel ){
		let url = URL+'loginAPI';
		return this.http.post(url, usuario)
			.map( (resp: any) => {
				console.log(resp);
				this.guardarStorage( resp );
				//console.log('Hola local storage');
				//console.log(JSON.parse(localStorage.getItem('usuario1')));

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
		let url = URL+'userap/'+usuario.id;
		return this.http.put(url, usuario);


	}
}
