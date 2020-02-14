import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthService {

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

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);//pega o token sem a palavra bearer
        let user: LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);//grava o token no storage
    }

    logout() {
        this.storage.setLocalUser(null);//qnd fazer logout apaga o token no storage
    }
}