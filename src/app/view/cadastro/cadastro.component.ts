import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioService } from '../../shared/services/usuario/usuario.service';

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

  salvarCadastro() {
    if(this.usuario.email.trim() === this.confirmEmail.trim() &&
    this.usuario.senha.trim() === this.confirmSenha.trim() && this.usuario.foto.trim() !== "") {
      this.usuario.nome = this.name.first + " " + this.name.last;
      const values = Object.values(this.usuario);
      const count = values.filter(value => typeof value === "string" ? value.trim() !== "" : true).length;
      if(count === values.length && this.usuario.foto !== undefined && this.usuario.foto.trim() !== "") {
        this.usuarioService.save(this.usuario).then(user => {
          window.alert("Usuário cadastrado com sucesso!");
          window.location.reload();
        })
      } else {
        window.alert("Preencha todos os campos antes de concluir");
      }
    } else {
      window.alert("Confirmação de emails ou senhas não conferem.");
    }
  }

}
