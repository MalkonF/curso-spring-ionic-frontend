import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Decorator - anotacao q começa com @  q vai ter configuracoes p alterar a classe. O que faz a classe 
//ser um modulo é o @NgModule
@NgModule({
  //componentes ou paginas q faz parte do modulo e que serao carregados qnd o modulo principal for carregado
  declarations: [MyApp],
  //modulos q serao usados
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  //como a app vai inciiar
  bootstrap: [IonicApp],
  //qnd no declaratio for uma pagina(n apenas um componente) a mesma coisa q vc declarar no declaration tem q ser declarada no entry componentes
  entryComponents: [MyApp],
  //modulos q usarao a mesma instancia
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { } // diz q AppModule pode ser usado p outras app

/* Ionic utiliza uma api do Cordova p acessar dispositivos mobile e utiliza componentes web do angular
para construir as app.
A funcao do ionic é fzr codigo hibrido usando componentes web.
App angular é divida em modulos e todos os elementos dessa aplicacao tem q estar dentro de um modulo.
Diretivas e componentes ficam dentro dos modulos:
Componente(controller) é um controlador de um template, template(view) é um codigo em html.
P trabalhar c os componentes usamos os metadados, q são decoratos q vc vai colocar no codigo p mudar
a funcionalidade dele.
Ai vc modifica o controlador e vai refletir no view, no view manda uma resposta vai refletir no controlador.
O controlador tb pode fazer o uso de serviços q sao injetados nos componentes.


O controlador da view chama a camada de serviço, e a camada de serviço chama os controladores do backend

O ionic roda no mobile por meio de uma webview, q seria a grosso modo um navegador sem a barra de
endereço.
*/