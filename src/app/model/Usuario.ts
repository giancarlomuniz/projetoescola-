import { Telefone } from "./telefone";

export class Usuario{
    
id?:Number;
nome?:String;
login:String = '';
senha?:String;
cpf?:String;
cep?:String;
logradouro?:String;
complemento?:String;
bairro?:String;
localidade?:String;
uf?:String;
sexo?:string;
telefones?: Array<Telefone>;
cargo?:String;



}