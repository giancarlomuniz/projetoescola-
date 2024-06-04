import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/Usuario';
import { Categoria } from 'src/app/model/categoria';

import { CategoriaService } from 'src/app/services/categoria.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {



  constructor(private fb:FormBuilder, private categoriaService:CategoriaService, private loginService:LoginService){

    
  }

 
  /*Pega dados do formulario*/
  catForm =this.fb.group({
    id:[],
     descricao:['',Validators.required],
     usuario:[Number(this.loginService.objetoUser()), Validators.required]
});




/*Tranforma em objeto*/
catObjeto():Categoria{
 
  return{
    id: this.catForm.get('id')?.value!,
    descricao: this.catForm.get('descricao')?.value!,
    usuario:this.catForm.get('usuario')?.value!,
   

  } ; 

}


/*Salvar Categoria*/
cadCategoria(){

  const categoria =this.catObjeto();

    categoria.id,
    categoria.descricao,
   categoria.usuario
  this.categoriaService.salvarCategoria(categoria);

}
}