import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule { }
/*Serviços so serao instanciados no escopo da pagina de signup, se quiser os serviços instanciados em outros
 lugares, tem q declarar no modulo correspondente. Se quiser q ele fiquei disponivel p app toda, declare no 
 modulo principal q é o app.
 */