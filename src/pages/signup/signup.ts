import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  formGroup: FormGroup;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {
    /*instancia formGroup. nome, email sao os mesmos nomes la no formulario. Esses nomes sao so p testes
    numa app real deixar vazio*/
    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;//armazena os estados q o get trouxe
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);//pega o id do 1 elemento da lista e atribui ela na lista do formulario
        this.updateCidades();//busca as cidades correspondentes ao estado q está selecionado
      },
        error => { });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;//o estado q está selecionado no form
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);//tira qualquer cidade selecionada 
      },
        error => { });
  }

  signupUser() {
    console.log("enviou o form");
  }
}
/*Todas validacoes sintaticas ou validacoes q n tem q ir no bd, a validação vai ser feita
no frontend p evitar de enviar requisições p backend. */
