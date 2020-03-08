import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];//p acomodar os itens do carrinho
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;//pega os itens do carrinho
    //busca o cliente por id e traz todos os dados deles
    this.clienteService.findById(this.pedido.cliente.id)//busca o id q ta no obj pedido
      .subscribe(response => {
        this.cliente = response as ClienteDTO;//pega os dados id nome e email somente da resposta e joga no clienteDTO
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },//no obj de pedido tem somente o id do endereço por isso tem q fazer o metodo abaixo de buscar o end correto pq o cliente pode ter mais de 1 endereço cadastrado
        error => {
          this.navCtrl.setRoot('HomePage');//se acontecer algum erro(token expirou etc) retorne p pagina inicial p fazer login novamente
        });
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);//encontrar x posição onde o x seja igual o id
    return list[position];
  }
  //mostra valor total do pedido
  total(): number {
    return this.cartService.total();
  }
  back() {
    this.navCtrl.setRoot('CartPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();//ja q salvou o carrinho limpa o carrinho no localStorage
        console.log(response.headers.get('location'));//se a resposta der certo é pq retornou a URI do novo recurso criado
      },
        error => {
          if (error.status == 403) {//403 problema de autorização ou autenticação
            this.navCtrl.setRoot('HomePage');
          }
        });
  }
}