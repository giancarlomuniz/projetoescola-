import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/api-response';
import { Aluno } from 'src/app/model/aluno';
import { Usuario } from 'src/app/model/Usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent {

  lista : Usuario[] = [];
  alunoForm:FormGroup;
  
  cadUsuario:Usuario;
  usuario: Usuario[];
  vaPesquisa:string = '';
  qtdPage:Number = 0;
  arrayQtdPagina:Number[]=[];
  paginaAtual:Number = 1;
  
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private alunoService:AlunoService, private http:HttpClient){


    this.alunoForm = this.fb.group({
   
      usuario:[Number(this.editarUser),Validators.required],
      nomePai:['',Validators.required],
      dataIngresso:['', Validators.required],
    

    });
  }
  
ngOnInit():void{
this.qtdPaginaUser();
  this.qtdPaginaUser();
  this.listUse(this.paginaAtual);
this.exibiCargo();
}

qtdPaginaUser(){
  this.alunoService.qtdPage().subscribe({

    next:(res) => {
      this.qtdPage =  Number (res);
   
        this.arrayQtdPagina =Array(this.qtdPage).fill(1).map((x,i) => i);
       console.info(this.arrayQtdPagina);
  },
  error:(error) => {
    
  },
  });
   this.listUse(0);
}

     /*Pegar dados do formularios*/
          
 cadUserObjeto(): Aluno{
     return{
       usuario:this.alunoForm.get('usuario')?.value,
       nomePai: this.alunoForm.get('nomePai')?.value,
       dataIngresso: this.alunoForm.get('dataIngresso')?.value,

     
   };
   
  
  }

  cadProf(): void {
 
    const aluno = this.cadUserObjeto();

    const alunoJSON = JSON.stringify(aluno);
    console.info(alunoJSON);

  }


//Preencher select One
exibiCargo(){
  this.usuarioService.getCargo().subscribe(

    (response)=>{
    
      //this.categoria = response;
     
    }
  );

      }



  listUse(pag: Number):void{
    
    this.alunoService.lsitarAluno(pag).subscribe({

      next:(resposta:ApiResponse)=>{
  this.lista = resposta.content;
  console.info(this.lista);
      },
      error:(error)=>{
        alert(error);
   }
    });
      
     
}

idUsuario(){
  
  
}

editarUser(c:Usuario):void{

  
  this.usuarioService.buscaId(c.id).subscribe({
 
    next:(data) =>{
   
   console.info(data.id)

   this.alunoForm =this.fb.group({
    usuario:[data.id],
 
});

   },
error(error) {
  alert(error);
},
  });

}

deleteUser(c:Usuario):void{

  var confirme = confirm('Deseja relamente excluir usario '+c.nome+ '?');
  if(confirme){

this.usuarioService.deletarUsuario(c);

this.listUse(this.paginaAtual);
}
}




novo(){
  /*Limpa formulario*/
  this.alunoForm = this.fb.group({
   
    id:[],
    nome:['',Validators.required],
    cpf:['',Validators.required],
    login:['', Validators.required],
    senha:['', Validators.required],
    cep: ['', Validators.required], // Certifique-se de que o campo CEP existe no seu formulário
    logradouro: ['', Validators.required],
    complemento: ['', Validators.required],
    bairro: ['', Validators.required],
    localidade: ['', Validators.required],
    uf: ['', Validators.required],
    sexo:['', Validators.required],
    cargos:[''],
  });
}

setPesquisa(val:string):void{

  this.vaPesquisa = val;
  }
  
  pesquisar():void{
  
    if (this.vaPesquisa.length <= 0) {
      this.listUse(this.paginaAtual);
      return;
    }else  {
      const isCpf = /^\d+$/.test(this.vaPesquisa);

if (isCpf){

      this.usuarioService.consultaUsuarioCpf(this.vaPesquisa).subscribe({

        next:(res) =>{
          this.lista= res;
          console.info(this.lista);
        },
      });
    }
    if(this.vaPesquisa === ''){
      this.listUse(this.paginaAtual);
    }else{
    
  this.usuarioService.consultaUsuario(this.vaPesquisa).subscribe({
  
    next:(res) =>{
      this.lista= res;
      console.info(this.lista);
    },
  });
}

  }
  }

  buscaPagina(page:Number):void{
    this.paginaAtual =page;
  
  this.listUse(this.paginaAtual);
  
  }

  voltar():void{
    if(this.paginaAtual.valueOf() > 0){
    this.paginaAtual = this.paginaAtual.valueOf() - 1;
    } 
    this.listUse(this.paginaAtual);
   }
   avancar(): void{
     if(this.paginaAtual.valueOf() < this.qtdPage.valueOf()){
     this.paginaAtual = this.paginaAtual.valueOf() + 1;
     }
     this.listUse(this.paginaAtual);
    }

}
