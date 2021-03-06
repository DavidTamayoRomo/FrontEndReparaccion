import { Injectable } from '@angular/core';
import{environment} from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './../../../utils/http-utils.service';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { RegistroModel } from '../models/registro.model';
import { LoginModel } from '../models/login.model';
import swal from 'sweetalert';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
const URL=environment.url1;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	//usuario:UsuarioModel;
	usuario:LoginModel;
	usuarioCompleto:UsuarioModel;
	
	returnUrl: string;
  constructor(private route: ActivatedRoute, public http: HttpClient,private router: Router ) { 
		
		this.usuarioCompleto = JSON.parse( localStorage.getItem('usuario1') );
		
		
		//codigo para continuar con la ruta previamente seleccionada
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
		/*console.log("este es el servicio");
		console.log(this.returnUrl);
		console.log("termina servicio usuario");*/
	}
	ngOnInit() {
        // get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
	//====================================================
	//			obtener usuario logeado
	//====================================================
	getUsuarioActual() {
		let user_string = localStorage.getItem("usuario1");
		if (!isNullOrUndefined(user_string)) {
			//console.log('verifico usuario si esta log');
		  this.usuarioCompleto = JSON.parse(user_string);
		  return this.usuarioCompleto;
		} else {
		  return null;
		}
	}

	//====================================================
	//						LocalStorage
	//====================================================
	obtenerUsuario(){
		this.usuarioCompleto = JSON.parse( localStorage.getItem('usuario1') );
	}

	guardarStorage( usuario: UsuarioModel ) {
		//console.log(usuario);
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
				
				if(resp.name==undefined){
					swal('Importante', 'Datos incorrectos, revisar correo o contraseña', 'warning');
				}else{
					this.guardarStorage( resp );
					//this.router.navigateByUrl(this.returnUrl);
					window.location.href = this.returnUrl;
				}
	
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
	actualizarUsuario( usuario ){
		this.obtenerUsuario();
		//console.log(this.usuarioCompleto);
		let url = URL+'user/edit-userap?api_token='+this.usuarioCompleto.api_token;
		return this.http.post(url, usuario).map( (resp: any) => {
			this.guardarStorage( resp );
		  });;
	}

	subirFoto(usuario:FormData,id)
	{
		this.obtenerUsuario();
		//console.log(this.usuarioCompleto);
		//console.log('userphot',usuario.get('avatar'));
		let url = URL+'user/edit-userphoto/'+id+'?api_token='+this.usuarioCompleto.api_token;	
		return this.http.post(url, usuario).map( (resp: any) => {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
	//para actualizar el estado del contrato
	updateContrato( contrato ){
		let url = URL+'contrato/edit/'+contrato.id;
		return this.http.post(url,contrato);	
	}

//Listar contratos de usuario
	getContratosUsuario(id): Observable<any> {
		//console.log(id);
		return this.http.get<any>(URL+'user-contratos-contratista/'+id);
   }
}
