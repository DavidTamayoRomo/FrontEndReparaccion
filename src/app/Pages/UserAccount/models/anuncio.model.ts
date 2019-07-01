import { Contratistas1Model } from './contratistaListar/contratistas1.model';
import { tipodeTrabajoModel } from './contratistaListar/tipodeTrabajo.model';
export class AnuncioModel  {   
    public id: number;
    public contratista_id:number;
    public tipotrabajo_id:number;
    public titulo:string;
    public imagen:string;
    public descripcion:string;
    public aprobado: number;
    public clicks:number;
    public created_at:string;
    public updated_at:string;
    public contratista: Contratistas1Model;
    public tipoTrabajo:tipodeTrabajoModel;
}