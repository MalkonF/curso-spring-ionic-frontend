export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    imageUrl?: string;//atributo opcional, n precisa ser preenchido
}
/*Esse cliente dto tem que ter os mesmos atributos que o cliente dto do backend*/