import { Injectable } from '@angular/core';
import{environment} from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './../../../utils/http-utils.service';
import { Observable } from 'rxjs';
const URL=environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// createContratista(): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	return this.http.post<any>(URL+'/contratista', {'user_id':1,'plan_id':1,
  //   'descripcion':'hola','ultima_ubicacion':'xxxxx'});
	// }
	createContratista(): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'/estado', {nombre:'darwin'});
	}
}
