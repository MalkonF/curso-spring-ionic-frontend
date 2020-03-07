import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id : string;
    nome : string;
    estado? : EstadoDTO; //campo opcional, pode buscar so as cidades
}