import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera/';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera,
  ) {
  }

  ionViewDidLoad() {//executar qnd a pagina for carregada
    this.loadData();
  }
  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {//localUser possui campo email?
      this.clienteService.findByEmail(localUser.email).
        subscribe(response => {/*Faz a requisição e se inscreve p receber uma reposta.Se receber sucesso na resposta acontece abaixo, senao error =>*/
          this.cliente = response as ClienteDTO;//faz casting p ClienteDTO. Força modelar a resposta p DTO pq cliente foi declarado como clienteDTO 
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

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      targetWidth: 300,
      targetHeight: 300,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG, //formato da imagem
      mediaType: this.camera.MediaType.PICTURE,
    }


    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;//salva o caminho da imagem
      this.cameraOn = false;//desabilita o botao qnd acionar p tirar foto 
    }, (err) => {
      console.log(err);
    });
  }
  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
      },
        error => {
        });
  }

  cancel() {
    this.picture = null;
  }

}
