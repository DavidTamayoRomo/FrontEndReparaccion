import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListaContratistasModel } from '../../Pages/UserAccount/models/contratistaListar/listaContratistas.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import { ContratistasTipoTrabajoModel } from 'src/app/Pages/UserAccount/models/contratistaListar/contratistasTipoTrabajo.model';
import { Observable } from 'rxjs';

const URL=environment.url1;

@Injectable({
  providedIn: 'root'
})
export class AllContratistaService {
	
	public isLoading: boolean = false;

  	constructor(public http: HttpClient) { }
	//====================================================
	//   obtener contratistas
	//====================================================	
	getContratistas(): Promise<ListaContratistasModel>{
		this.isLoading = true;
		let url = URL+"contratista-paginate"
        return this.http.get(url)
        .toPromise()
        .then((response) => {
            this.isLoading = false;
            return response as ListaContratistasModel
		})
		.catch(this.handleError);
        
	}

	//====================================================
	//   obtener contratistas con paginacion para los botones
	//====================================================
	getContratistasUrl(url: string): Promise<ListaContratistasModel>{
        this.isLoading = true;
        return this.http.get(url)
        .toPromise()
        .then((response) => {
            this.isLoading = false;
            return response as ListaContratistasModel
        })
        .catch(this.handleError);
	}
	getContratistasUrl1(n: number): Promise<ListaContratistasModel>{
		this.isLoading = true;
		let url = URL+"contratista-paginate?page="+n;
        return this.http.get(url)
        .toPromise()
        .then((response) => {
            this.isLoading = false;
            return response as ListaContratistasModel
        })
        .catch(this.handleError);
	}
	
	//busqueda por tipo de trabajo
	/*getContratistasUrlTipoTrabajo(n: number): Promise<ContratistasTipoTrabajoModel>{
		this.isLoading = true;
		let url = URL+"tipoTrabajo-contratistas/"+n;
        return this.http.get(url)
        .toPromise()
        .then((response) => {
            this.isLoading = false;
            return response as ContratistasTipoTrabajoModel
        })
        .catch(this.handleError);
	}*/
	getContratistasUrlTipoTrabajo( n: number ):Observable<ContratistasTipoTrabajoModel>{
		let url = URL+"tipoTrabajo-contratistas/"+n;
		return this.http.get<ContratistasTipoTrabajoModel>(url);	
	}
	
	
	private handleError(error: any): Promise<any> {
        console.error('A ocurrido un error', error); 
        this.isLoading = false;
        return Promise.reject(error.message || error);
    }



	//====================================================
	//   contratos que tiene el contratista
	//====================================================

	contratosContratistas( id ){
		let url = URL+'contratista-contratos/'+id;
		return this.http.get(url)	
	}

}
