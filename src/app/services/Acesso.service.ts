import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { LoginService } from './login.service';
import { Acesso } from '../model/acesso';



@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private urlApi = AppConstants.getBaseUrlPath;

  constructor(private http: HttpClient, private loginService:LoginService, private router:Router) { }

 salvarAcesso(acesso:Acesso){

   return this.http.post<String>(this.urlApi +'/salvarAcesso', acesso).subscribe({
     
     next:(res: any) =>{
      console.info(res);

      var varResposta = JSON.stringify(res);
     
      var jsonResposta = JSON.parse(varResposta);

      if (jsonResposta.error != undefined) {
        alert(jsonResposta.error.mensage);
      }else{
    
        alert(jsonResposta.mensage);
      }
      
    },

    error:(error)=>{
      console.info(error);
      alert('Deu erro:' + error);
    }
    
  });
 }

 deletarAcesso(acesso:Acesso):void{

  this.http.post<String>(this.urlApi +'/deleteAcesso', acesso).subscribe({
    
    next:(res) =>{
   
      var varResposta = JSON.stringify(res);
     
      var jsonResposta = JSON.parse(varResposta);

      if (jsonResposta.error != undefined) {
        alert(jsonResposta.error);
      }else{
        alert(jsonResposta);
      }
     
   },

   error:(error)=>{
     console.info(error);
     alert('Deu erro:' + error);
   }
   
 });
}

 lsitaAcesso(pagina:Number){
  return  this.http.get<Acesso[]>(this.urlApi + '/listaPorPagina/' + this.loginService.objetoUser() + '/'+ pagina);
 }



 buscaId(id:any){

  return this.http.get<Acesso>(this.urlApi + '/buscaId/'+ id);
 }

 consultaAcesso( val: String){
  return this.http.get<Acesso[]>(this.urlApi + '/buscaPorNome/'+ val + '/'+this.loginService.objetoUser());

 }

 qtdPage(){
  return this.http.get<any>(this.urlApi + '/qtdPagina/' +this.loginService.objetoUser());

 }


}
