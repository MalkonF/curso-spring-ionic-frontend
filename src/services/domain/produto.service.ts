import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor (public http: HttpClient) {
    }
    /*P usar o infinity scroll o backend tem q prover a funcionalidade de paginação */
    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }
    //recebe o id e da um get do tipo produtoDTO no endpoint...
    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }
    //carrega imagem pequena
    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    //busca imagem grande do produto
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }
}