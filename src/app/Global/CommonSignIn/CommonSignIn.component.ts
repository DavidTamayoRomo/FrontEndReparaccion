import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl( null ,[ Validators.required,, Validators.email] ),
      password: new FormControl( null , Validators.required )   
    })
  }

  ingresarUsuario(){
    console.log(this.form.value);
    //console.log(this.form.value['email']);
  }

}
