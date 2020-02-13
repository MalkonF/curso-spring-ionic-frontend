import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
//vai conf a app p q essa classe seja uma pagina e vou poder referenciar o nome dela entre aspas(string)
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'//qual arquivo html ele esta controlando
})
export class HomePage {
  /*Instancia um objeto. Faz o bind desse objeto com o valor dos campos no home.html */
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  /*No angular se vc declarar um componente no construtor da classe ela é injetada automaticamente.
  NavController permite vc navegar de uma pagina p outra. */
  constructor (public navCtrl: NavController, public menu: MenuController) {

  }/*Desabilita o menu qnd entra na pagina. ionViewWill..faz parte do lifecycle do ionic */
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  /*Qnd sair da pagina habilita o menu */
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }


  /*No typescript a classe, atributo, metodo tem q ser acessado precedido do this */
  login() {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');//abre a page Categorias.html. CategoriasPage é o controlador de Categorias.html
  }

}
/*Este é o controlador da home.html. o @Component é o que faz ele ser o controlador. */