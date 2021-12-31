import { Component, OnInit } from '@angular/core';
import { Cardapio } from 'src/app/shared/model/cardapio';
import { Usuario } from 'src/app/shared/model/usuario';
import { CardapioService } from 'src/app/shared/services/cardapio/cardapio.service';
import { LoginPublisher } from 'src/app/shared/services/login/login-publisher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-perfil',
  templateUrl: './chef-perfil.component.html',
  styleUrls: ['./chef-perfil.component.scss']
})
export class ChefPerfilComponent implements OnInit {

  cardapios: Cardapio[] = [];
  usuarioLogado: Usuario;
  loaded: boolean = false;

  constructor(private cardapioService: CardapioService, private loginPublisher: LoginPublisher, private router: Router) {}

  ngOnInit(): void {
    this.loginPublisher.addSubscriber(this);
    this.loginPublisher.verificaLogin(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;

    if(usuarioLogado !== null) {
      this.updateLogado();
      this.loaded = true;
    } else
      this.router.navigate(['']);
  }

  async updateLogado() {
    await this.getCardapios();
  }

  async getCardapios() {
    const cardapios = (await this.cardapioService.getAll()).filter(cardapio => cardapio.id_chef == this.usuarioLogado.id);
    if(cardapios.length > 0)
      this.cardapios = cardapios;
    else
      this.cardapios.push(new Cardapio());
  }

  uploadFoto(foto: HTMLInputElement) {
    const files: FileList = foto.files;
    if (files.length < 1) {
      return;
    }

    let file = files[0];
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.usuarioLogado.foto = reader.result.toString();
      }
    } catch (error) {
      console.warn("File upload failed.");
      console.error(error);
    }
  }

  uploadFotoCardapio(foto: HTMLInputElement, cardapio: Cardapio) {
    const files: FileList = foto.files;
    if (files.length < 1) {
      return;
    }

    let file = files[0];
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        cardapio.foto = reader.result.toString();
      }
    } catch (error) {
      console.warn("File upload failed.");
      console.error(error);
    }
  }

  salvarPerfil() {

  }

  novoCardapio() {
    this.cardapios.push(new Cardapio());
  }

  removerCardapio(cardapio: Cardapio) {
    this.cardapios.splice(this.cardapios.indexOf(cardapio), 1);
  }

}
