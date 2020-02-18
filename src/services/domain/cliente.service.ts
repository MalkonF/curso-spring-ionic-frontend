import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor (public http: HttpClient, public storage: StorageService) {
    }
    //recebe email como arg e retorna tipo observable
    findByEmail(email: string): Observable<ClienteDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`, //endpoint q busca por email
            { 'headers': authHeader });//inclui o cabeçalho authorization na requisição
    }
    //any é o tipo do typescript q aceita qualquer coisa
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });//faz requisição falando q a resposta vai ser um blob, uma imagem e n um JSON
    }
} 