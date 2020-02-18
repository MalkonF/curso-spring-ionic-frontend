import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();//pega o token
        /*o cabeçalho de authorization so tem q se incluido na req qnd for uma req p a api do backend. 
        Se a requisicao for p a api, inclui o cabeçalho, se n for, n inclui o cabeçalho. */
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;//se isso for igual ao API_CONFIG entao a req é p api

        if (localUser && requestToAPI) {//se existe o token no localStorage vc inclui o cabeçalho na requisicao
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });//clona a requisicao acrescentando o token
            return next.handle(authReq);
        }
        else {
            return next.handle(req);//se o local user n existir,apos interceptar, repassa a requisicao sem alteracoes
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};