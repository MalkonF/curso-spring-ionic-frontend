import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
//vai conf a app p q essa classe seja uma pagina e vou poder referenciar o nome dela entre aspas(string)
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'//qual arquivo html ele esta controlando
})
export class HomePage {
  /*No angular se vc declarar um componente no construtor da classe ela é injetada automaticamente.
  NavController permite vc navegar de uma pagina p outra. */
  constructor (public navCtrl: NavController) {

  }
  /*No typescript a classe, atributo, metodo tem q ser acessado precedido do this */
  login() {
    this.navCtrl.setRoot('CategoriasPage');//abre a page Categorias.html. CategoriasPage é o controlador de Categorias.html
  }

}
/*Este é o controlador da home.html. o @Component é o que faz ele ser o controlador. */