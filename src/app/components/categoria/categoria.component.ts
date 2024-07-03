import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/Usuario';
import { Categoria } from 'src/app/model/categoria';

import { CategoriaService } from 'src/app/services/categoria.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  catForm: FormGroup;
  lista = new  Array<Categoria>();
 cadProd: Categoria;
  vaPesquisa:String = '';
   qtdPage:Number = 0;
  arrayQtdPagina:Number[]=[];
  paginaAtual:Number = 1;


  constructor(private fb:FormBuilder, private categoriaService:CategoriaService, private loginService:LoginService){

    /*Pega dados do formulario, salva e  inicializa um novo form em branco*/ 
    this.catForm =this.fb.group({
      id:[],
       descricao:['',Validators.required],
       usuario:[Number(this.loginService.objetoUser()), Validators.required]
  });
  }
  ngOnInit(): void {
    this.categoriaService.qtdPage().subscribe({
   
      next:(res) => {
      this.qtdPage =  Number (res);
        this.arrayQtdPagina = Array(this.qtdPage).fill(0).map((x,i) => i);
    
  
  },
  error:(error) => {
    
  },
    });

    console.info(this.lista);
    this.listaCategoria(0);
  }
  



listaCategoria(pagina:Number):void{
  this.categoriaService.lsitaCategoria(pagina).subscribe({
    next: (res) =>{
     this.lista = res;
   
    },
        error:(error)=>{
         alert(error);
    }
   
     });
}
 

novo(){
    /*Pega dados do formulario*/
    this.catForm =this.fb.group({
      id:[],
       descricao:['',Validators.required],
       usuario:[Number(this.loginService.objetoUser()), Validators.required]
  });
}





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
 this.novo();
  //Atualizar tabela
   this.listaCategoria(this.paginaAtual);

}

editarCat(c:Categoria):void{
    this.categoriaService.buscaId(c.id).subscribe({
     next:(data) =>{
   this.cadProd = data;

   this.catForm =this.fb.group({
    id:[this.cadProd.id],
     descricao:[this.cadProd.descricao,Validators.required],
     usuario:[this.cadProd.usuario, Validators.required]
});

   },
error(error) {
  alert(error);
},
  });

}

deleteCat(c:Categoria):void{

  var confirme = confirm('Deseja relamente excluir categoria '+c.descricao+ '?');
  if(confirme){

this.categoriaService.deletarCategoria(c);

this.listaCategoria(this.paginaAtual);

}
}
setPesquisa(val:String):void{

this.vaPesquisa = val;
}

pesquisar():void{

  if (this.vaPesquisa.length <= 0) {
    this.listaCategoria(this.paginaAtual);
    return;
  }
this.categoriaService.consultaCategoria(this.vaPesquisa).subscribe({

  next:(res) =>{
    
    this.lista = res;
  },
})

}
buscaPagina(page:Number):void{
  this.paginaAtual =page;

this.listaCategoria(this.paginaAtual);

}

voltar():void{
 if(this.paginaAtual.valueOf() > 0){
 this.paginaAtual = this.paginaAtual.valueOf() - 1;
 } 
 this.listaCategoria(this.paginaAtual);
}
avancar(): void{
  if(this.paginaAtual.valueOf() < this.qtdPage.valueOf()){
  this.paginaAtual = this.paginaAtual.valueOf() + 1;
  }
  this.listaCategoria(this.paginaAtual);
 }

}