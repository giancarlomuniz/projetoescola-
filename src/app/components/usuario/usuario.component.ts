import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/api-response';
import { Usuario } from 'src/app/model/Usuario';
import { Categoria } from 'src/app/model/categoria';
import { UsuarioService } from 'src/app/services/usuario.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  
  listaUsuario : Usuario[] = [];
  usuarioForm:FormGroup;
  categoria: Categoria[];
  cadUsuario:Usuario;
  usuario: Usuario[];
  vaPesquisa:string = '';
  qtdPage:Number = 0;
  arrayQtdPagina:Number[]=[];
  paginaAtual:Number = 1;
  
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private http:HttpClient){
 
   this.usuarioForm = this.fb.group({
   
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
  
ngOnInit():void{
this.qtdPaginaUser();
  this.qtdPaginaUser();
  this.listUse(this.paginaAtual);
this.exibiCargo();

}

qtdPaginaUser(){
  this.usuarioService.qtdPage().subscribe({

    next:(res) => {
      this.qtdPage =  Number (res);
   
        this.arrayQtdPagina =Array(this.qtdPage).fill(0).map((x,i) => i);
     
  },
  error:(error) => {
    
  },
  });
   this.listUse(0);
}

consultaCep():void{
  const cep = this.usuarioForm.get('cep')?.value.replace(/\D/g, '');
  if (cep !== '' && /^[0-9]{8}$/.test(cep)) {
    this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe(
      (data: any) => {
        if (!data.erro) {
          this.usuarioForm.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
          });
        } else {
          this.limpaFormularioCep();
          alert('CEP não encontrado.');
        }
      },
      error => {
        this.limpaFormularioCep();
        alert('Erro ao consultar CEP.');
      }
    );
  } else {
    this.limpaFormularioCep();
    alert('Formato de CEP inválido.');
  }
 
}
limpaFormularioCep(): void {
  this.usuarioForm.patchValue({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  });
}
  
     /*Pegar dados do formularios*/

           
 cadUserObjeto():Usuario{
   return{
     id:this.usuarioForm.get('id')?.value ?? 0,
     nome:this.usuarioForm.get('nome')?.value!,
     cpf:this.usuarioForm.get('cpf')?.value!,
     login:this.usuarioForm.get('login')?.value!,
     senha:this.usuarioForm.get('senha')?.value!,
     cep:this.usuarioForm.get('cep')?.value!,
     logradouro:this.usuarioForm.get('logradouro')?.value!,
     complemento:this.usuarioForm.get('complemento')?.value!,
     bairro:this.usuarioForm.get('bairro')?.value!,
     localidade:this.usuarioForm.get('localidade')?.value!,
     uf:this.usuarioForm.get('uf')?.value!,
     sexo:this.usuarioForm.get('sexo')?.value!,
     cargo:this.usuarioForm.get('cargos')?.value!,
         
   };
   
   }
 
 

/*Salvar Usuario*/
  cadUser(){
    const usuario =this.cadUserObjeto();

    this.usuarioService.salvarUsuario(usuario);
   this.novo();
   this.listUse(this.paginaAtual);
  }
  
//Preencher select One
exibiCargo(){
  this.usuarioService.getCargo().subscribe(

    (response)=>{
    
      this.categoria = response;
     
    }
  );

      }



  listUse(pag: Number):void{
    
    this.usuarioService.lsitarUsuario(pag).subscribe({

      next:(resposta:ApiResponse)=>{
  this.listaUsuario = resposta.content;

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

   this.usuarioForm =this.fb.group({
    id:[c.id],
     nome:[c.nome,Validators.required],
     cpf:[c.cpf, Validators.required],
     cep:[c.cep, Validators.required],
     sexo:[c.sexo, Validators.required],
     logradouro:[c.logradouro, Validators.required],
     complemento:[c.complemento, Validators.required],
     bairro:[c.bairro, Validators.required],
     localidade:[c.localidade, Validators.required],
     uf:[c.uf, Validators.required],
     cargos:[c.cargo, Validators.required],
     login:[c.login, Validators.required],
     senha:[c.senha, Validators.required],
     

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
  this.usuarioForm = this.fb.group({
   
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
          this.listaUsuario= res;
         
        },
      });
    }
    if(this.vaPesquisa === ''){
      this.listUse(this.paginaAtual);
    }else{
    
  this.usuarioService.consultaUsuario(this.vaPesquisa).subscribe({
  
    next:(res) =>{
      this.listaUsuario= res;
   
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
 


