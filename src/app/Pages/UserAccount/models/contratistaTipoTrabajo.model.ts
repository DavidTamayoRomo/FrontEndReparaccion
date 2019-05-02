
export class ContratistaTipoTrabajoModel  {
    contratista_id:number;
    tipoTrabajo_id:number;
    constructor(contratista_id:number,tipoTrabajo_id:number){
        this.contratista_id=contratista_id;
        this.tipoTrabajo_id=tipoTrabajo_id;
    }
}