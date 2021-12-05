import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/services-firestore/usuario/usuario.service';

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
  is_chef: boolean = this.usuario.is_chef;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
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
      console.warn("File upload failed.");
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
          window.alert("Usuário cadastrado com sucesso!");
          window.location.reload();
        });

      } else
        window.alert("Preencha todos os campos antes de concluir");
    } else
      window.alert("Confirmação de emails ou senhas não conferem.");
  }

}
