import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
@NgModule({
    declarations: [HomePage],
    
    imports: [IonicPageModule.forChild(HomePage)]
})
export class HomeModule {
}
/*lazy loading - so sera carregado as paginas qnd necessario. Ao inves de colocar todas as paginas em
 declaration, dividimos ela em modulos e ela so sera carregada qnd for acionada pela aplicação. */