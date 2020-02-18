import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {//executar qnd a pagina for carregada
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {//localUser possui campo email?
      this.clienteService.findByEmail(localUser.email).
        subscribe(response => {/*Faz a requisição e se inscreve p receber uma reposta.Se receber sucesso na resposta
        acontece abaixo, senao error =>*/
          this.cliente = response;
          this.getImageIfExists();
        },
          error => { 
            if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');//else do primeio if, caso ocorra algum problema na hora de obter localuser
    }
  }
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { });
  }
}