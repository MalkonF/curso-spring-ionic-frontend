import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';
/*Cart não existe no backend */
@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }
    //ou limpa ou cria o carrinho no localStorage. Metodo retorna um Cart
    createOrClearCart() : Cart {
        let cart: Cart = {items: []};// items c lista vazia
        this.storage.setCart(cart);
        return cart;
    }
    //obtem o carrinho
    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {//se Cart n existe, crie o cart
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();//se carrinho n existe crie
        let position = cart.items.findIndex(x => x.produto.id == produto.id);//busca no carrinho se o prod exsite
        if (position == -1) {//tenta encontrar na lista de index um produto c mesmo codigo do produto q veio no arg do metodo
            cart.items.push({quantidade: 1, produto: produto});//se n encontrar retona negativo ai add
        }
        this.storage.setCart(cart);//atualiza o carrinho no localStorage
        return cart;
    }
}