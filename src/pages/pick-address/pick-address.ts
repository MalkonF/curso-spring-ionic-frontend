import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor (public navCtrl: NavController, public navParams: NavParams, public storage: StorageService,
    public clienteService: ClienteService, public cartService: CartService) {
  }
  //aqui meio q vai buscar as informações do cliente no bd la no backend e junstar com os items q ele escolhe p comprar e depois vai mandar
  //um obj ja montado com os dados do pedido p o backend faturar
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];//pega so a parte dos endereços da resposta
          let cart = this.cartService.getCart();
          this.pedido = {
            cliente: { id: response['id'] },//atribui a id q veio na busca do cliente p esta var
            enderecoDeEntrega: null,//aqui é null pq o user n chegou na tela de escolher endereço
            pagamento: null,//percorre a lista de produtos(itens de carrinho) e p cada item dessa lista instancia um objeto no formato quantidade e produto
            itens: cart.items.map(x => { return { quantidade: x.quantidade, produto: { id: x.produto.id } } })
          }
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }
  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});//passa o pedido p outra page
    console.log(this.pedido);
  }
}

