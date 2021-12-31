import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { Categoria } from '../../shared/model/categoria';
import { UsuarioService } from '../../shared/services/usuario/usuario.service';
import { CategoriaService } from '../../shared/services/categoria/categoria.service';

import { DataService } from '../../shared/services/data/data.service';
import { LoginPublisher } from 'src/app/shared/services/login/login-publisher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias: Categoria[];
  chefs: Usuario[];
  usuarioLogado: Usuario;

  constructor(private categoriaService: CategoriaService, private usuarioService: UsuarioService, private dataService: DataService, private loginPublisher: LoginPublisher) { }

  ngOnInit(): void {
    // this.dataService.init();
    this.setCategorias();
    this.setChefs();

    this.loginPublisher.addSubscriber(this);
    this.loginPublisher.verificaLogin(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;
  }

  async setCategorias() {
    this.categorias = await this.categoriaService.getAll();
  }

  async setChefs() {
    this.chefs = (await this.usuarioService.getAll()).filter(chef => chef.ischef);
  }

}
