import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor (public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaService) {
  }
  /*Qnd a pagina terminar de ser carregada ai executar as instrucoes abaixo.
  Como é uma chamada assincrono, vc primeiro tem q se inscrever com .subscribe, e
  dentro dele vc coloca uma funcao p ser executada qnd a resposta chegar. 
  A funcao anonima aqui mostra no log o que ela recebeu se tiver sucesso ou erro. */
  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
        });
  }

}
