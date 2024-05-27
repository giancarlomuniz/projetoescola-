import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi = AppConstants.baseUrl;

  constructor(private http: HttpClient, private router:Router) {

   }

   salvarUsuario(user:Usuario){
  return this.http.post<any>(this.urlApi + '/', user ).subscribe({

    next:(res) => {
      
    },
    error:(error) => {
      console.info(error);
      alert(error);
    },
  });
   }

   buscaCep(cep: string): Observable<any>{
  
return this.http.get(AppConstants.baseUrl+'/cep/'+cep);
   }

}
