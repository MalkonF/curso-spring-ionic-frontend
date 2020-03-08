import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];//inicia c a lista vazia pq toda vez q carregar a page vai concatenar c a lista d prod ja existente
  page: number = 0;

  constructor (public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }
  loadData() {
    let categoria_id = this.navParams.get('categoria_id');//pega o parametro q a categoria passou p page produtos
    let loader = this.presentLoading();//lugar ideal p chamar o loading é onde vc acha q a requisição vai demorar
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);//recebe os produtos q veio na resposta. Como o endpoint é paginado o atributo content tem os dados dos produtos
        let end = this.items.length - 1;//pega o tamanho da lista apos receber os produtos
        loader.dismiss();//fecha a janela de loading depois q a resposta chegar
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);//depois q chegar os produtos chama carregamento de imagem
      },
        error => { loader.dismiss(); });//se der erro tb cancela a janela do loading
  }
  //percorre a lista de produtos
  loadImageUrls(start: number, end: number) {
    for (var i = start; i <= end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {//se a img existir seta o campo imageUrl do dto do produto. La na page de produtos tem uma condicao se a variavel n tiver setada pega img padrao
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }
  showDetail(produto_id: string) {//na chamada da outra pagina(produto detail) passa o produto id p outra page
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;//retorna o load instanciado pq depois tem q ter acesso a este objeto p fecha o loading
  }
  //faz uma chamada assincrona c setTimeout p executar o loadData e mostrar o desenho do carregamento
  doRefresh(refresher) {
    this.page = 0;
    this.items = [];//zera a lista qnd da o refresher
    this.loadData();//chama a requisição q busca os produtos
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }//incrementa a page a buscar no backend, carrega os primeiros 10 produtos e mostra o efeito visual 1 segundo
  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}