import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;//pickadress vai preencher essa var e depois ela é passada p page de pagamento

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.pedido = this.navParams.get('pedido');
      //controla o validator do formulario
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],//1 é o valor padrao q ja vai aparecer e o dado é obrigatorio
      "@type": ["pagamentoComCartao", Validators.required]//valor padrao pagamentoComCartao
    });//pagamentoComCartao tem que ser igual ao q ta no backend abaixo da anotação @JsonTypeName
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;//preenche o tipo de pagamento
    console.log(this.pedido);
  }
}