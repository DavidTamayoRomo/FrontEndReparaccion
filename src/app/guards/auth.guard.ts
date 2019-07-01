import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../Pages/UserAccount/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UsuarioService, private router: Router) { }
  canActivate() {
    if (this.authService.getUsuarioActual()) {
      // login TRUE
      return true;
    } else {
        this.router.navigate(['session/signin']);
        return false;
    }
  }
}
