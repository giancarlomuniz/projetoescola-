import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpIinterceptorModule } from './interceptor/interceptor-projeto.interceptor';
import { guardiaoGuard } from './guard/guardiao.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { NavEsquedaComponent } from './nav-esqueda/nav-esqueda.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProfessorComponent } from './components/professor/professor.component';






export const appRoutes: Routes = [

  {path: 'login', component: LoginComponent},
  {path:'', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[guardiaoGuard], data:{role:['ROLE_ADMIN', 'ROLE_PROFESSOR', 'ROLE_ALUNO', 'ROLE_USER']}},
  {path: 'categoria', component: CategoriaComponent, canActivate:[guardiaoGuard], data:{role:['ROLE_ADMIN']}},
  {path: 'usuario', component: UsuarioComponent, canActivate:[guardiaoGuard], data:{role:['ROLE_ADMIN']}},
 
 
];
  
export const routes = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
       AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NavEsquedaComponent,
    CategoriaComponent,
    UsuarioComponent,
    ProfessorComponent
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routes,
      HttpIinterceptorModule,



  
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
