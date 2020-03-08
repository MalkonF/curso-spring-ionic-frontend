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
    //usa esse metodo para verifica se o cliente q está logado é o mesmo q está no pedido
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
    //recebe email como arg retorna objeto cliente inteiro c tds atributos.Endpoint q busca por email
    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);

    }
    //any é o tipo do typescript q aceita qualquer coisa
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });//faz requisição falando q a resposta vai ser um blob, uma imagem e n um JSON
    }
    //faz um post no endpoint clientes passando obj e espera uma resposta do tipo texto(pq o corpo vem vazio p evitar erro de parse de JSON)
    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
