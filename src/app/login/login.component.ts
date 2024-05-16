import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { Usuario } from '../model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login de Acesso';

  


  constructor(private fb: FormBuilder, private loginService: LoginService){

  }
  ngOnInit() {

    if (localStorage.getItem('token') !== null &&  localStorage.getItem('token')?.toString().trim()!== null) {
      
     
    }
  
  }
  /*Pegar dados do formularios*/
  loginFrom = this.fb.group({

id:[],
login:[null, Validators.required],
senha:[null, Validators.required]
  });


loginObjeto():Usuario{
return{

  login:this.loginFrom.get('login')?.value!,
  senha:this.loginFrom.get('senha')?.value!,
}

}

fazerLogin(){
  const usuario =this.loginObjeto();

  this.loginService.logar(usuario);
  console.info(usuario.login);
  console.info(usuario.senha);
}

recuperarSenha(){
  const usuario = this.loginObjeto();

  var login = usuario.login;

  console.info('Login :' + login);

  if (login == '') {
    alert('Informe o login para recuper a senha');
  }else{

    this.loginService.recuperar(login);
  }
}

}
