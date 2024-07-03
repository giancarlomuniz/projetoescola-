import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Acesso } from 'src/app/model/acesso';
import { AcessoService } from 'src/app/services/acesso.service';


import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit{
[x: string]: any;

  acessoForm: FormGroup;
  lista = new  Array<Acesso>();
 cadAcesso: Acesso;
  vaPesquisa:String = '';
   qtdPage:Number = 0;
  arrayQtdPagina:Number[]=[];
  paginaAtual:Number = 1;


  constructor(private fb:FormBuilder, private acessoService:AcessoService, private loginService:LoginService){

    /*Pega dados do formulario, salva e  inicializa um novo form em branco*/ 
    this.acessoForm =this.fb.group({
      id:[],
       descricao:['',Validators.required],
       usuario:[Number(this.loginService.objetoUser()), Validators.required]
  });
  }
  ngOnInit(): void {
    this.acessoService.qtdPage().subscribe({
   
      next:(res) => {
      this.qtdPage =  Number (res);
        this.arrayQtdPagina = Array(this.qtdPage).fill(0).map((x,i) => i);
    
  
  },
  error:(error) => {
    
  },
    });

 
    this.listaAcesso(0);
  }
  



listaAcesso(pagina:Number):void{
  this.acessoService.lsitaAcesso(pagina).subscribe({
    next: (res) => {
    
      console.info(res)
      this.lista = res;
        
    },
    error: (error) => {
      alert(error);
    }
   
     });
}
 

novo(){
    /*Pega dados do formulario*/
    this.acessoForm =this.fb.group({
      id:[],
       descricao:['',Validators.required],
       usuario:[Number(this.loginService.objetoUser()), Validators.required]
  });
}





/*Tranforma em objeto*/
catObjeto():Acesso{
 
  return{
    id: this.acessoForm.get('id')?.value!,
    nomeRole: this.acessoForm.get('descricao')?.value!,
    usuario:this.acessoForm.get('usuario')?.value!,
   

  } ; 

}


/*Salvar Categoria*/
salvarAcesso(){

  const acesso =this.catObjeto();


  this.acessoService.salvarAcesso(acesso);
 this.novo();
  //Atualizar tabela
   this.listaAcesso(this.paginaAtual);

}

editarAcesso(c:Acesso):void{
    this.acessoService.buscaId(c.id).subscribe({
     next:(data) =>{
   this.cadAcesso = data;

   this.acessoForm =this.fb.group({
    id:[this.cadAcesso.id],
     descricao:[this.cadAcesso.nomeRole,Validators.required],
     usuario:[this.cadAcesso.usuario, Validators.required]
});

   },
error(error) {
  alert(error);
},
  });

}

deleteAcesso(c:Acesso):void{

  var confirme = confirm('Deseja relamente excluir Acesso '+c.nomeRole+ '?');
  if(confirme){

this.acessoService.deletarAcesso(c);

this.listaAcesso(this.paginaAtual);

}
}
setPesquisa(val:String):void{

this.vaPesquisa = val;
}

pesquisar():void{

  if (this.vaPesquisa.length <= 0) {
    this.listaAcesso(this.paginaAtual);
    return;
  }
this.acessoService.consultaAcesso(this.vaPesquisa).subscribe({

  next:(res) =>{
    
    this.lista = res;
  },
})

}
buscaPagina(page:Number):void{
  this.paginaAtual =page;

this.listaAcesso(this.paginaAtual);

}

voltar():void{
 if(this.paginaAtual.valueOf() > 0){
 this.paginaAtual = this.paginaAtual.valueOf() - 1;
 } 
 this.listaAcesso(this.paginaAtual);
}
avancar(): void{
  if(this.paginaAtual.valueOf() < this.qtdPage.valueOf()){
  this.paginaAtual = this.paginaAtual.valueOf() + 1;
  }
  this.listaAcesso(this.paginaAtual);
 }

}