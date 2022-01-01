import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/shared/model/login';
import { Usuario } from 'src/app/shared/model/usuario';
import { Router } from '@angular/router';
import { LoginPublisher } from 'src/app/shared/services/login/login-publisher.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pathNotSearch: string[] = ["cadastro"];
  showPopUp: boolean = false;
  usuarioLogin: Login = new Login();
  usuarioLogado: Usuario = null;

  constructor(private loginPublisher: LoginPublisher, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginPublisher.addSubscriber(this);
    this.loginPublisher.verificaLogin(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;
    if(usuarioLogado)
      this.updateLogado();
  }

  updateLogado(): void {
    this.showPopUp = false;
  }

  routerHome(): void {
    this.router.navigate(['']);
  }

  routerPerfil(): void {
    this.router.navigate(['chef-perfil']);
  }

  routerCadastro(): void {
    this.router.navigate(['cadastro']);
  }

  showSearch(): boolean {
    return !this.pathNotSearch.includes(window.location.pathname.replace("/",""));
  }

  changePopUpShowButton(): void {
    this.showPopUp = !this.showPopUp;
  }

  changePopUpShow(event: Event, popUpBox: HTMLDivElement): void {
    if(event.target === popUpBox)
      this.showPopUp = !this.showPopUp;
  }

  fazerLogin() {
    if(this.usuarioLogin.email && this.usuarioLogin.senha)
      this.loginPublisher.fazerLogin(this.usuarioLogin);
    else
      this.snackBar.open("Preencha todos os campos obrigatórios.", "Fechar");
  }

  logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.reload();
  }
}
