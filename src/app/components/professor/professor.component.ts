import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/api-response';
import { Usuario } from 'src/app/model/Usuario';
import { Professor } from 'src/app/model/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent {
  lista : Usuario[] = [];
  professorForm:FormGroup;

  cadUsuario:Usuario;
  usuario: Usuario[];
  vaPesquisa:string = '';
  qtdPage:Number = 0;
  arrayQtdPagina:Number[]=[];
  paginaAtual:Number = 1;
  
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private profeService:ProfessorService, private http:HttpClient){


    this.professorForm = this.fb.group({
   
      id:[],
      dataAdmProf:[""],
      usuario:[]

    });
  }
  
ngOnInit():void{
this.qtdPaginaUser();
  this.qtdPaginaUser();
  this.listUse(this.paginaAtual);
this.exibiCargo();


}

qtdPaginaUser(){
  this.profeService.qtdPage().subscribe({

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
          
 cadUserObjeto(): Professor{
     return{
    dataAdmProf: this.professorForm.get('dataAdmProf')?.value,
      id_usuario: this.professorForm.get('id')?.value,
   };
  
  }

  cadProf(): void {
    const professor = this.cadUserObjeto(); // Corrigi a declaração da variável
    const prof ={
       dataAdmProf:professor.dataAdmProf,
      usuario:{
        id:professor.id_usuario,
       }
      }
  
    this.profeService.salvarProfes(professor); // Chame o serviço com o objeto corrigido
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
    
    this.profeService.lsitarUsuario(pag).subscribe({

      next:(resposta:ApiResponse)=>{
  this.lista = resposta.content;
  console.info(this.lista);
      },
      error:(error)=>{
        alert(error);
   }
    });
      
     
}

editarUser(c:Usuario):void{

  
  this.usuarioService.buscaId(c.id).subscribe({
 
    next:(data) =>{
   this.cadUsuario = data;

   console.info(this.cadUsuario)

   this.professorForm =this.fb.group({
    id:[this.cadUsuario.id],
 
});
console.info(this.cadUsuario.id);
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
  this.professorForm = this.fb.group({
   
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
