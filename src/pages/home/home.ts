import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
//vai conf a app p q essa classe seja uma pagina e vou poder referenciar o nome dela entre aspas(string)
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'//qual arquivo html ele esta controlando
})
export class HomePage {

  constructor (public navCtrl: NavController) {

  }

}
/*Este é o controlador da home.html. o @Component é o que faz ele ser o controlador. */