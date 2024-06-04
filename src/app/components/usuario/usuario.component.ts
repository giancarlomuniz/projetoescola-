import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  categoria: Categoria[];
  
  constructor(private fb:FormBuilder, private usuarioService:UsuarioService){}
  

ngOnInit(){

  
this.exibiCargo();
}
   
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
       uf: [null, Validators.required],
       sexo:['', Validators.required],
       cargos:[''],
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
     sexo:this.usuarioForm.get('sexo')?.value!,
     cargo:this.usuarioForm.get('cargos')?.value!,
     
 
   
    
   };
   
   }
 

  consultaCep(){

    
   
   const usuario = this.cadUserObjeto();
    const cep = this.usuarioForm.get('cep')?.value;

    if (cep) {
      
    
   this.usuarioService.buscaCep(cep).subscribe((dados) =>{

    const dadosCep ={

      logradouro:  dados.logradouro,
     
      complemento: dados.complemento,
     bairro: dados.bairro,
    localidade:dados.localidade,
      uf:dados.uf,
    };
   this.usuarioForm.patchValue(dadosCep);
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
    this.usuarioForm.reset();
  }

exibiCargo(){

      
  this.usuarioService.getCargo().subscribe(

    (response)=>{
      console.info(response);
      this.categoria = response;

     
    }
  );
   
 
    
    }

 
 }


