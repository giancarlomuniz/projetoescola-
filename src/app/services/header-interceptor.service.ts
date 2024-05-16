import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var autorization = '' + localStorage.getItem('Authorization');
    console.info(autorization);

    if (autorization !== '' && autorization !== null && autorization !== 'null' ) {
    
      
      const autReq = req.clone({

        headers: req.headers.set('Authorization', autorization)
      });
      return next.handle(autReq);
    }else{

      return next.handle(req);
    }
 
  

    
  }
}
@NgModule({
providers : [{
provide: HTTP_INTERCEPTORS,
useClass: HeaderInterceptorService,
multi: true,

},
],
})
export class HttpInterceptorModule{

}