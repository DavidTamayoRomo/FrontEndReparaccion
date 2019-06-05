import { UserModel } from './user.model';
import { tipodeTrabajoModel } from './tipodeTrabajo.model';

export class DataModel  {
    
    
        public id: number;
        public user_id:number;
        public plan_id:number;
        public descripcion:string;
        public ultima_ubicacion:string;
        public estado:string;
        public created_at:string;
        public updated_at: string;
        public user:UserModel;
        public tipotrabajos:tipodeTrabajoModel[];
        
    
}