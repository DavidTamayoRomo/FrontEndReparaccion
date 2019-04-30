import { Injectable } from '@angular/core';
import{environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../../utils/http-utils.service';
import { Observable } from 'rxjs';
const URL=environment.url;

@Injectable({
  providedIn: 'root'
})
export class ContratistaService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	createContratista(contratista): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'/contratista', contratista,{headers:httpHeaders});
	}

}
