import { Injectable, NgModule } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class InterceptorProjetoInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.info('Chamando interceptor');

    if (localStorage.getItem('Authorization') !== null) {
      const token = 'Bearer ' + localStorage.getItem('Authorization' )
   
      const tokenRequest = request.clone({
  headers: request.headers.set('Authorization', token)
      });
      return next.handle(tokenRequest).pipe(

  tap((event: HttpEvent<any>) =>{
 if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
  console.info('Sucesso na Operação')
 }
  }),
  catchError(this.processaError));
    }else{

      return next.handle(request).pipe(catchError(this.processaError));
    }


    
  }
  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    } else {
      errorMessage = 'Codigo: ' + error.error.code + '\nMensagem: ' + error.error.error;
    }
 
    return throwError(errorMessage);
  }

}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorProjetoInterceptor,
    multi: true,
  },
  ],
})

export class HttpIinterceptorModule{

}
