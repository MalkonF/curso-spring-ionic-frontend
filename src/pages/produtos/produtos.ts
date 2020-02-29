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
        this.loadImageUrls();//depois q chegar os produtos chama carregamento de imagem
      },
        error => { });//se der erro n faz nada
  }
  //percorre a lista de produtos
  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {//se a img existir seta o campo imageUrl do dto do produto. La na page de produtos tem uma condicao se a variavel n tiver setada pega img padrao
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }
  showDetail() {
    this.navCtrl.push('ProdutoDetailPage');
  }
}