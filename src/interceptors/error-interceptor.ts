import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor (public storage: StorageService, public alertCtrl: AlertController) {
    }

    /*Implementação do metodo intercept da interface HttpInterceptor. O metodo intercepta qualquer requisição
    para a app e  */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)/*Continue a requisição e se acontecer algum erro retorne ele */
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {/*
                    No retorno do erro este é a parte do erro(parte do header) q a api retorna. Se
                    existir o erro*/
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {//se n tiver o campo status entao n é json
                    errorObj = JSON.parse(errorObj);//converte p json
                }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();//erro autenticação
                        break;

                    case 403: //caso o erro seja 403(acesso n autorizado)
                        this.handle403();
                        break;

                    case 422: //erro de validação
                        this.handle422(errorObj);
                        break;

                    default:
                        this.handleDefaultEror(errorObj);
                }

                return Observable.throw(errorObj);//retorna so a parte do erro do backend. Na vdd ele propaga o erro
            }) as any;
    }
    handle403() {
        this.storage.setLocalUser(null);//força a limpeza do localStorage. Pq um possivel localUser q esta no storage ta invalido pq acabou tempo de validade token
    }

    handle401() {//cria um obj do Alert
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),//lista cada um dos erros
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false, //p sair do alert tem q apertar botao no alert e n fora
            buttons: [
                {
                    text: 'Ok' //botao
                }
            ]
        });
        alert.present();//mostra o alert
    }
    //estrutura as mensagens de erro q foi recebida do backend
    private listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}
/*Como o interceptor vai ser instanciado? Aqui é uma exigencia do angular p o interceptor ser criado */
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
/*Modelo de interceptor p tratamento de erros, para ficar melhor arquitetado, deve ser feito o tratamento
 em duas camadas.
Na camada de tratamento de erros, e de forma global(p pegar qualquer erro), e caso qnd ocorrer o erro seja
necessario redirecionamento, ele tem q ser implementado na camada de resources, pq
ela é q faz a navegação e navegação tem a ver com redirecionamento. */