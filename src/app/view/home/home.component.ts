import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { Categoria } from '../../shared/model/categoria';
import { UsuarioService } from '../../shared/services-firestore/usuario/usuario.service';
import { CategoriaService } from '../../shared/services-firestore/categoria/categoria.service';

import { DataService } from '../../shared/services-firestore/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias: Categoria[];
  chefs: Usuario[];

  constructor(private categoriaService: CategoriaService, private usuarioService: UsuarioService, private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.init();
    this.setCategorias();
    this.setChefs();
  }

  async setCategorias() {
    this.categorias = await this.categoriaService.getAll();
  }

  async setChefs() {
    this.chefs = (await this.usuarioService.getAll()).filter(chef => chef.is_chef);
  }

}
