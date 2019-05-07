import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../services/UsuarioService';
import {ContratistaService} from '../services/ContratistaService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {
  contratista;
  constructor(private activatedRoute: ActivatedRoute,
		private router: Router,private _usuarioService:UsuarioService,
    private _contratistaService:ContratistaService) { }
 
  ngOnInit() {
    
  }

  obtenerContratista(){
    this._contratistaService.getContratistaByIdUsuario(this._usuarioService.usuarioCompleto.id).subscribe(res=>{
      this.contratista=res;
    },error=>{
      alert("Error al obtener contratista")
    })
  }

  irModificarContratista(){
    const _urlContratista = 'profile/contratista/' + 1;
		this.router.navigateByUrl(_urlContratista);
  }



}
