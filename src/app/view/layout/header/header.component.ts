import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/shared/model/login';
import { Usuario } from 'src/app/shared/model/usuario';
import { Router } from '@angular/router';
import { LoginPublisher } from 'src/app/shared/services/login/login-publisher.service';

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

  constructor(private loginPublisher: LoginPublisher, private router: Router) { }

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

  routerPerfil(): void {
    this.router.navigate(['/chef-perfil']);
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
    this.loginPublisher.fazerLogin(this.usuarioLogin);
  }

}
