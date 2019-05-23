import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {

  usuarioCompleto:UsuarioModel;
  constructor(public _usuarioService: UsuarioService) { 
    //inicializado el usuario
    this.usuarioCompleto = _usuarioService.usuarioCompleto;
  }

  ngOnInit() {
  }

}
