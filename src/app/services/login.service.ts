import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AppConstants } from '../app-constants';
import { Categoria } from '../model/categoria';





@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
 




  constructor(private http: HttpClient, private router: Router) { }


  logar(usuario: Usuario){
 return this.http.post<String>(AppConstants.baseLogin, JSON.stringify( usuario)).subscribe({
   next:(res) =>{
  var respJson = JSON.stringify(res)
var jwt = JSON.parse(respJson);

localStorage.setItem('Authorization',jwt.Authorization);
localStorage.setItem('username',jwt.username);
localStorage.setItem('professor',jwt.professor);

this.router.navigate(['home']);

},


error:(error) => {
  console.info(error);
  alert('Acesso Negado');
}
  });


 
  }

recuperarSenha(login: String) {

  
return this.http.post<String>(AppConstants.baseUrl + "/recuperarSenha", login).subscribe({

next:(res) => {
  var respJson = JSON.stringify(res);
  var resposta =JSON.parse(respJson);
  alert(resposta.msg);
},
error:(error) =>{
  var respJson = JSON.stringify(error);
  var resposta = JSON.parse(respJson);

   alert(resposta.msg);
},

  });

  }

  usuarioLogado(){
    var auhorization = '' + localStorage.getItem('Authorization');
    return auhorization !== '' && auhorization !== null && auhorization!== 'null';
  }

  deslogar(){
    localStorage.clear();
    this.router.navigate(['login']);
  }



 objetoUser():String{
  const codUse = localStorage.getItem ('professor') ;
    return codUse;
  }




}

