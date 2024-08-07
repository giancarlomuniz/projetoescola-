import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../model/categoria';
import { AppConstants } from '../app-constants';
import { LoginService } from './login.service';
import { Usuario } from '../model/Usuario';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi = AppConstants.getBaseUrlPath;

  constructor(private http: HttpClient, private loginService:LoginService, private router:Router) { }

 salvarCategoria(categoria:Categoria){

   return this.http.post<String>(this.urlApi +'/categoria/salvarCategoria', categoria).subscribe({
     
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

 deletarCategoria(categoria:Categoria):void{

  this.http.post<String>(this.urlApi +'/deletarCategoria', categoria).subscribe({
    
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

 lsitaCategoria(pagina:Number){
  return  this.http.get<Categoria[]>(this.urlApi + '/listaPorPageCategoria/' + this.loginService.objetoUser() + '/'+ pagina);
 }



 buscaId(id:any){

  return this.http.get<Categoria>(this.urlApi + '/buscaId/'+ id);
 }

 consultaCategoria( val: String){
  return this.http.get<Categoria[]>(this.urlApi + '/buscaPorDesCategoria/'+ val + '/'+this.loginService.objetoUser());

 }

 qtdPage(){
  return this.http.get<any>(this.urlApi + '/qtdPagina/' +this.loginService.objetoUser());

 }


}
