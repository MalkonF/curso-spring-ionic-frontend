import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';//diz qual vai ser a pagina inicial da app 

  pages: Array<{ title: string, component: string }>;

  constructor (
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService
  ) {
    this.initializeApp();

    // aqui aparece as entradas do menu(canto superior esquerdo)
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Carrinho', component: 'CartPage' },
      { title: 'Logout', component: '' }//aki fica sem component pq ele vai ser implementado no met openPage
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /*Qnd o openPage for chamado e o obj p for o objeto de logout, executa o logout.
   */
  openPage(page: { title: string, component: string }) {//e necessario definir esses atributo p acessar atributos da page
    switch (page.title) {
      case 'Logout':
        this.auth.logout();//apaga token do localStorage
        this.nav.setRoot('HomePage');
        break;

      default:
        this.nav.setRoot(page.component);
    }
  }
}
/*Este arquivo é o controlador da page app.html */