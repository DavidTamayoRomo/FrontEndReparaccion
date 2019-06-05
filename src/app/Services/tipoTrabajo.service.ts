import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tipodeTrabajoModel } from '../Pages/UserAccount/models/contratistaListar/tipodeTrabajo.model';
import { environment } from '../../environments/environment';

const URL=environment.url1;

@Injectable({
  providedIn: 'root'
})
export class tipoTrabajoService {
  public isLoading: boolean = false;
  constructor(public http: HttpClient) { }

  //====================================================
	//   obtener Tipo Trabajo
	//====================================================	
	getTipoTrabajos(): Promise<tipodeTrabajoModel>{
		this.isLoading = true;
		let url = URL+"tipotrabajo"
        return this.http.get(url)
        .toPromise()
        .then((response) => {
            this.isLoading = false;
            return response as tipodeTrabajoModel
		})
		.catch(this.handleError);
        
  }
  
  private handleError(error: any): Promise<any> {
    console.error('A ocurrido un error', error); 
    this.isLoading = false;
    return Promise.reject(error.message || error);
}

}
