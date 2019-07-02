import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../Pages/UserAccount/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UsuarioService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log(route);
    console.log(state.url);//ruta en la que estuve antes de iniciar sesion
    let url=state.url;
    if (this.authService.getUsuarioActual()) {
      // login TRUE
      return true;
    } else {
        //{queryParams: {returnUrl: state.url}} sirve para guardar la ruta en la url
        //y luego recuperarla con snapshot
        this.router.navigate(['session/signin'],{queryParams: {returnUrl: state.url}});
        return false;
    }
    
  }
}
