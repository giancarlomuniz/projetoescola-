import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { ApiResponse } from '../api-response';
import { Observable } from 'rxjs';

import { Aluno } from '../model/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private urlApi = AppConstants.baseUrl;

  constructor(private http: HttpClient, private router:Router) { }

  lsitarAluno(pagina:Number):Observable<ApiResponse>{
    return  this.http.get<ApiResponse>(this.urlApi + '/aluno'+'/page/'+ pagina);
   }

  
   salvarAluno(aluno:Aluno){
    

    return this.http.post<Aluno>(this.urlApi + '/aluno'+ '/salvar', aluno).subscribe({
      
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
   salvarAlu(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.urlApi + '/usuario/professor'+ '/salvar', aluno);
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
