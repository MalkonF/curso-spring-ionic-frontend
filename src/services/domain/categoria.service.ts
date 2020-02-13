import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";
/*Classe se torna injetavel c essa anotacao*/
@Injectable()
export class CategoriaService {
    //injeta o httpclient
    constructor(public http: HttpClient) {
    }
    /*Retorna a lista de categorias. get faz a chamada p backend. Retorna o tipo de dados Lista de 
    categorias. No angular uma req http é assíncrona e n retorna o objeto, ela retorna Observable
    pq o angular encapsula esse mecanismo de requisicao assincrona por meio desse objeto. */
    findAll() : Observable<CategoriaDTO[]>  {//crase permite colocar valor da variavel
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}