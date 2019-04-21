import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'embryo-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form  : FormGroup;
  constructor( public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl( null ,[ Validators.required,, Validators.email] ),
    });
  }

  Generarpasword(){
    console.log(this.form.value);
    console.log('Generar Contraseña');
    swal('Correcto', 'Datos enviados a '+this.form.value['email'] , 'success');
  }

}
