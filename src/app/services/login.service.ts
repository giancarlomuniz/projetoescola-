import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
 


private urlApi = enviroment.urlApi

  constructor(private http: HttpClient, private router: Router) { }


  logar(usuario: Usuario){
 return this.http.post<String>(enviroment.urlApi, JSON.stringify( usuario)).subscribe({
   next:(res) =>{
  var respJson = JSON.stringify(res)
var jwt = JSON.parse(respJson);

localStorage.setItem('Authorization',jwt.Authorization);

this.router.navigate(['home']);

},


error:(error) => {
  console.info(error);
  alert('Acesso Negado');
}
  });


 
  }

  recuperar(login: String) {
return this.http.post<String>(enviroment.urlApiLocal + 'recuperarSenha', login).subscribe({

  next:(res) =>{
    var respJson = JSON.stringify(res);
        var resposta = JSON.parse(respJson);

          alert(resposta.msg);
  },
error:(error) =>{
  var respJson = JSON.stringify(error);
         var resposta = JSON.parse(respJson);

          alert(resposta.msg);
}


  });

  }

  usuarioLogado(){
    var auhorization = '' + localStorage.getItem('token');
    return auhorization !== '' && auhorization !== null && auhorization!== 'null';
  }

  
}

