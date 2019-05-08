import { Injectable } from '@angular/core';
import{environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../../utils/http-utils.service';
import{UsuarioService} from './usuario.service';
import { Observable } from 'rxjs';
const URL=environment.url;

@Injectable({
  providedIn: 'root'
})
export class ContratistaService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private _usuarioService:UsuarioService)  { }

	createContratista(contratista): Observable<any> {
		console.log(contratista);
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'/contratista', contratista);
	}
	// createContratista(contratista): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	return this.http.post<any>(URL+'/estado', contratista);
	// }
	//maestro detalle entre contratista  tipo de trabajo
	createContratistaTipoTrabajo(contratistaTipotrabajo): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'/contratista-addTrabajo', contratistaTipotrabajo);
	}

	getPlanes():Observable<any>{
		return this.http.get<any>(URL+'/plan');
	}

	getTiposTrabajo():Observable<any>{
		return this.http.get<any>(URL+'/tipotrabajo');
	}


	//logica de update contratista

	getContratistaLogueado():Observable<any>{
		return this.http.get<any>(URL+`/userap?api_token=`+this._usuarioService.usuarioCompleto.api_token);
	}

	updateContratistaTipoTrabajo(contratistaTipotrabajo): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'/contratista-addTrabajo', contratistaTipotrabajo);
	}

	updateContratista(contratista): Observable<any> {
		console.log(contratista);

		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put<any>(URL+'/contratista/'+contratista.id, contratista);
	}



}
