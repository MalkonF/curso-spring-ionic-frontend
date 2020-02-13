import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /*Implementação do metodo intercept da interface HttpInterceptor. O metodo intercepta qualquer requisição
    para a app e  */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no interceptor");
        return next.handle(req)/*Continue a requisição e se acontecer algum erro retorne ele */
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {/*
                    No retorno do erro este é a parte do erro(parte do header) q a api retorna. Se
                    existir o erro*/
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {//se n tiver o campo status entao n é json
                    errorObj = JSON.parse(errorObj);//converte p json
                }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                return Observable.throw(errorObj);//retorna so a parte do erro do backend. Na vdd ele propaga o erro
            }) as any;
    }
}
/*Como o interceptor vai ser instanciado? Aqui é uma exigencia do angular p o interceptor ser criado */
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
/*Modelo de interceptor p tratamento de erros, para ficar melhor arquitetado, deve ser feito o tratamento
 em duas camadas.
Na camada de tratamento de erros, e de forma global(p pegar qualquer erro), e caso qnd ocorrer o erro seja
necessario redirecionamento, ele tem q ser implementado na camada de resources, pq
ela é q faz a navegação e navegação tem a ver com redirecionamento. */