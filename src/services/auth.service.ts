import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor (public http: HttpClient, public storage: StorageService) {
    }
    /*Envia email e senha para o endpoint login */
    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds, //quais os dados vao ser enviados p autenticar?
            {
                observe: 'response', //pega o header da minha resposta
                responseType: 'text' /* text e n json, pq o endpoint login retorna resposta corpo vazio. 
                Ai tenho q colocar q ele é texto p evitar q o framework faça parse, pq todo codigo json faz parte p texto*/
            });
    }
    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);//pega o token sem a palavra bearer
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub//extrai o email do token
        };
        this.storage.setLocalUser(user);//grava o token no storage
    }

    logout() {
        this.storage.setLocalUser(null);//qnd fazer logout apaga o token no storage
    }
}