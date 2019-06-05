

import { UsuarioService } from '../services/usuario.service';
import { ProfileComponent } from './Profile.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('ProfileComponent', () => {

    let componente: ProfileComponent;
    const servicio = new UsuarioService(null);

    beforeEach( () => {
        componente = new ProfileComponent(null,null,null,null,servicio);
    });


    xit('Init: Debe de cargar los datos del usuario en el local storage', () => {

        const usuario = ['medico1', 'medico2'];

        spyOn( servicio, 'obtenerUsuario' ).and.callFake( () => {

            return Observable.from( [  usuario  ] );
        });


        componente.ngOnInit();

        expect( componente.usuarios.length ).toBeGreaterThan(0);




    });





});