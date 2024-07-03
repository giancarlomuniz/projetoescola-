import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { ApiResponse } from '../api-response';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private urlApi = AppConstants.baseUrl;

  constructor(private http: HttpClient, private router:Router) { }

  lsitarUsuario(pagina:Number):Observable<ApiResponse>{
    return  this.http.get<ApiResponse>(this.urlApi + '/professor'+'/page/'+ pagina);
   }

  
   salvarProfes(professor:Professor){
    

    return this.http.post<Professor>(this.urlApi + '/professor'+ '/salvar', professor).subscribe({
      
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
   salvarProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.urlApi + '/usuario/professor'+ '/salvar', professor);
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
        return this.http.get<any>(this.urlApi + '/professor/'+'qtdPagina');
      
       }
}
