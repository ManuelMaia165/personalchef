import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/services/usuario/usuario.service';
import { LoginPublisher } from '../../shared/services/login/login-publisher.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  name = { "first": "", "last": "" };
  confirmEmail = "";
  confirmSenha = "";
  usuarioLogado: Usuario = null;
  is_chef: boolean = this.usuario.ischef;

  constructor(private usuarioService: UsuarioService, private loginPublisher: LoginPublisher, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginPublisher.addSubscriber(this);
    this.loginPublisher.verificaLogin(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;
  }

  uploadFoto(foto: HTMLInputElement, fotoCircle: HTMLImageElement) {
    const files: FileList = foto.files;
    if (files.length < 1) {
      return;
    }

    let file = files[0];
    try {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.usuario.foto = reader.result.toString();
        fotoCircle.src = this.usuario.foto;
      }
    } catch (error) {
      this.snackBar.open("Erro ao fazer upload de arquivo.","Fechar");
      console.error(error);
    }
  }

  changePerfil(event: MatRadioChange) {
    if(!event.value) {
      this.usuario.descricao_chef = "";
    }

    this.is_chef = event.value;
  }

  salvarCadastro() {
    if(this.usuario.email.trim() === this.confirmEmail.trim() &&
    this.usuario.senha.trim() === this.confirmSenha.trim()) {

      this.usuario.nome = this.name.first + " " + this.name.last;
      const count = Object.values(this.usuario).filter(value => typeof value === "string" ? value.trim() !== "" : true).length;

      if((this.is_chef && count === 12) || (!this.is_chef && count === 11)) {

        if(!this.is_chef)
          this.usuario.descricao_chef = null;

        this.usuarioService.save(this.usuario).then(user => {
          this.snackBar.open("Usuário cadastrado com sucesso!", "Fechar");
          window.location.reload();
        });

      } else
        this.snackBar.open("Preencha todos os campos antes de concluir", "Fechar");
    } else
      this.snackBar.open("Confirmação de emails ou senhas não conferem.", "Fechar");
  }

}
