import { Contratistas1Model } from './contratistas1.model';
export class ContratistasTipoTrabajoModel  {
    public id:number;
    public nombre:string;
    public created_at:string;
    public updated_at:string;
    public contratistas:Contratistas1Model[];
}