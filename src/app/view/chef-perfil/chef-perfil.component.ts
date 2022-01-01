import { Component, OnInit } from '@angular/core';
import { Cardapio } from 'src/app/shared/model/cardapio';
import { Usuario } from 'src/app/shared/model/usuario';
import { Categoria } from 'src/app/shared/model/categoria';
import { CardapioService } from 'src/app/shared/services/cardapio/cardapio.service';
import { LoginPublisher } from 'src/app/shared/services/login/login-publisher.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { CategoriaService } from 'src/app/shared/services/categoria/categoria.service';

@Component({
  selector: 'app-chef-perfil',
  templateUrl: './chef-perfil.component.html',
  styleUrls: ['./chef-perfil.component.scss']
})
export class ChefPerfilComponent implements OnInit {

  cardapiosBackup: Cardapio[] = [];
  cardapios: Cardapio[] = [];
  categorias: Categoria[] = [];
  usuarioLogado: Usuario = null;
  loaded: boolean = false;

  constructor(private cardapioService: CardapioService, private categoriaService: CategoriaService, private usuarioService: UsuarioService, private loginPublisher: LoginPublisher, private router: Router, private snackBar: MatSnackBar) {}

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
    await this.getCategorias();
  }

  async getCardapios() {
    const cardapios = (await this.cardapioService.getAll()).filter(cardapio => cardapio.id_chef == this.usuarioLogado.id);
    if(cardapios.length > 0) {
      this.cardapios = cardapios;
      this.cardapiosBackup = <Cardapio[]> JSON.parse(JSON.stringify(cardapios));
    } else if(this.cardapios.length === 0) {
      this.cardapios.push(new Cardapio());
    }
  }

  async getCategorias() {
    this.categorias = await this.categoriaService.getAll();
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
      this.snackBar.open("Erro ao fazer upload de arquivo.","Fechar");
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
      this.snackBar.open("Erro ao fazer upload de arquivo.","Fechar");
      console.error(error);
    }
  }

  async salvarPerfil() {
    if(this.validaPerfil(this.usuarioLogado)) {
      await this.usuarioService.update(this.usuarioLogado);
      this.loginPublisher.updateLogado(this.usuarioLogado);
      this.snackBar.open("Usuário atualizado com sucesso.", "Fechar");
    } else {
      this.snackBar.open("Preencha todos os campos obrigatórios.", "Fechar");
    }
  }

  async salvarCardapios() {

    for(var i = 0; i < this.cardapios.length; i++) {
      if(!this.validaCardapio(this.cardapios[i])) {
        this.snackBar.open("Preencha todos os campos obrigatórios.", "Fechar");
        return;
      }
    }

    let countUpdate = 0;
    let countSave = 0;
    let countDelete = 0;

    await this.cardapios.forEach(async (cardapio,index) => {
      cardapio.id_chef = this.usuarioLogado.id;
        if(cardapio.id) {
          countUpdate++;
          this.cardapios[index] = await this.cardapioService.update(cardapio);
        } else {
          countSave++;
          this.cardapios[index] = await this.cardapioService.save(cardapio);
        }
    });

    const cardapiosApagados = this.cardapiosBackup.filter(cardapio =>
      this.cardapios.filter(c => c.id === cardapio.id).length === 0
    );
    await cardapiosApagados.forEach(async cardapio => {
      await this.cardapioService.delete(cardapio.id);
      this.cardapiosBackup.splice(this.cardapiosBackup.indexOf(cardapio), 1);
      countDelete++
    });

    if(countUpdate > 0 || countSave > 0 || countDelete > 0)
      this.snackBar.open("Cardápios atualizados com sucesso.", "Fechar");
  }

  validaPerfil(usuario: Usuario) {
    return usuario.nome && usuario.nome.trim() !== "" &&
      usuario.descricao_chef && usuario.descricao_chef.trim() !== "" &&
      usuario.foto && usuario.foto.trim() !== "" &&
      usuario.telefone && usuario.telefone.trim() !== "" &&
      usuario.sexo && usuario.sexo.trim() !== "" &&
      usuario.nascimento && usuario.nascimento.trim() !== "" &&
      usuario.endereco && usuario.endereco.trim() !== "" &&
      usuario.complemento && usuario.complemento.trim() !== "";
  }

  validaCardapio(cardapio: Cardapio) {
    return cardapio.nome && cardapio.nome.trim() !== "" &&
      cardapio.foto && cardapio.foto.trim() !== "" &&
      cardapio.id_categoria && cardapio.id_categoria.toString().trim() !== "" &&
      cardapio.valor && cardapio.valor.toString().trim() !== "" &&
      cardapio.contorno && cardapio.contorno.trim() !== "" &&
      cardapio.aperitivo && cardapio.aperitivo.trim() !== "" &&
      cardapio.dolce && cardapio.dolce.trim() !== "" &&
      cardapio.primi_piatto && cardapio.primi_piatto.trim() !== "" &&
      cardapio.secondo_piatto && cardapio.secondo_piatto.trim() !== "" &&
      cardapio.antipasto && cardapio.antipasto.trim() !== "";
  }

  novoCardapio() {
    this.cardapios.push(new Cardapio());
  }

  removerCardapio(cardapio: Cardapio) {
    this.cardapios.splice(this.cardapios.indexOf(cardapio), 1);
  }

}
