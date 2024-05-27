import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {


  constructor(private fb:FormBuilder, private categoriaService:CategoriaService){}
}
