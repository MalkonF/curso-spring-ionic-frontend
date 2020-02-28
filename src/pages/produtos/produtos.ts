import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor (public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');//pega o parametro q a categoria passou p page produtos
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];//recebe os produtos q veio na resposta. Como o endpoint é paginado o atributo content tem os dados dos produtos
      },
        error => { });//se der erro n faz nada
  }
}