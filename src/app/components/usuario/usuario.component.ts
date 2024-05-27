import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent  {

  
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService){}

 
  
    /*Pegar dados do formularios*/
 usuarioForm = this.fb.group({
  
      id:[],
      nome:[null,Validators.required],
      cpf:[null,Validators.required],
      login:[null, Validators.required],
      senha:[null, Validators.required],
      cep: [null, Validators.required], // Certifique-se de que o campo CEP existe no seu formulário
      logradouro: [null, Validators.required],
      complemento: [null, Validators.required],
      bairro: [null, Validators.required],
      localidade: [null, Validators.required],
      uf: [null, Validators.required]
     
  
        });
  

      
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
  
   
  };
  
  }

  consultaCep(){

   
   const usuario = this.cadUserObjeto();
    const cep = this.usuarioForm.get('cep')?.value;

    if (cep) {
      
    
   this.usuarioService.buscaCep(cep).subscribe((dados) =>{

  console.info(dados);
 usuario.logradouro = dados.logradouro;
 usuario.complemento = dados.complemento;
 usuario.bairro = dados.bairro;
 usuario.localidade = dados.localidade;
 usuario.uf = dados.uf;
 console.info(usuario);
    
   },
   (error)=>{
    console.error('Erro ao buscar CEP:', error);
   }
  
  );
  }else{
console.error('Cep não informado');
 
  }
  }



  cadUser(){
    const usuario =this.cadUserObjeto();
  
     
    console.debug(usuario);

    this.usuarioService.salvarUsuario(usuario);
  }



}
