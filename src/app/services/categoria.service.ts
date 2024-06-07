import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../model/categoria';
import { AppConstants } from '../app-constants';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi = AppConstants.getBaseUrlPath;

  constructor(private http: HttpClient, private router:Router) { }

 salvarCategoria(categoria:Categoria){

   return this.http.post<String>(this.urlApi +'categoria/salvarCategoria', categoria).subscribe({
     
     next:(res) =>{
      console.info(res);

      var varResposta = JSON.stringify(res);
     
      var jsonResposta = JSON.parse(varResposta);

      if (jsonResposta.error != undefined) {
        alert(jsonResposta.error);
      }else{

        alert('Salvo com sucesso !');
      }
      
    },

    error:(error)=>{
      console.info(error);
      alert('Deu erro:' + error);
    }
    
  });
 }

 lsitaCategoria(){
  return  this.http.get<Categoria[]>(this.urlApi + 'lsitaCategoria');
 }

}
