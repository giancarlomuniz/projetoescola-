import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './services/header-interceptor.service';









export const appRoutes: Routes = [

  {path: 'login', component: LoginComponent},
  {path:'', component: AppComponent},
  {path: 'home', component: HomeComponent,},


];
  
export const routes = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule
  
  ],
  providers: [ ],

  bootstrap: [AppComponent]
})
export class AppModule { }
