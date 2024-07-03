import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { Response } from './response';
import { ApiResponse } from '../api-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi = AppConstants.baseUrl;



  constructor(private http: HttpClient, private router:Router) { }

   
 
   getCargo():Observable<Categoria[]>{
    return this.http.get<Categoria[]>( AppConstants.getBaseUrlPath +'lsitaCategoria');
   }

     lsitarUsuario(pagina:Number):Observable<ApiResponse>{
    return  this.http.get<ApiResponse>(this.urlApi + '/page/'+ pagina);
   }

  


   salvarUsuario(user:Usuario){
  return this.http.post<any>(this.urlApi + '/', user ).subscribe({

    next:(res) => {
      alert('Salvo com sucesso');

    },
    error:(error) => {
      console.info(error);
      alert(error);
    },
  });
   }
/* este metodo que usa a api está dezabilitado, visto que, foi feito um metodo no usuario-component com busca direta na url ViaCep
  
buscaCep(cep: string): Observable<any>{
  
     return this.http.get(AppConstants.baseUrl+'/cep/'+cep);
   }
     */

   novoUser() {
 
  }
  buscaId(id:any){

    return this.http.get<Usuario>(this.urlApi + '/buscaId/'+ id);
   }
   


   
   deletarUsuario(user:Usuario):void{

    this.http.post<String>(this.urlApi +'/deleteUsuario', user).subscribe({
      
      next:(res) =>{
     
        var varResposta = JSON.stringify(res);
       
        var jsonResposta = JSON.parse(varResposta);
  
        if (jsonResposta.error != undefined) {
          alert(jsonResposta.error);
        }else{
          alert(res);
     
        }
       
     },
  
     error:(error)=>{
       console.info(error);
       alert('Deu erro:' + error);
     }
     
   });
  }

  consultaUsuario( val: String){
    return this.http.get<Usuario[]>(this.urlApi + '/consultanome/'+ val );
  
   }
   consultaUsuarioCpf( val: String){
    return this.http.get<Usuario[]>(this.urlApi + '/consultacpf/'+ val );
  
   }


      //Lista paginada todos os usarios
      qtdPage(){
        return this.http.get<any>(this.urlApi + '/qtdPagina');
      
       }

}
