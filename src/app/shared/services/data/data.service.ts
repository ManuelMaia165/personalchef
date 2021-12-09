import { Injectable } from '@angular/core';
import * as data from '../../../../db.json';

import { CategoriaService } from '../categoria/categoria.service'
import { UsuarioService } from '../usuario/usuario.service'
import { CardapioService } from '../cardapio/cardapio.service'
import { AgendamentoService } from '../agendamento/agendamento.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  collections: string[] = ["agendamentos","cardapios","categorias","usuarios"];

  constructor(private categoriaService: CategoriaService, private usuarioService: UsuarioService, private cardapioService: CardapioService, private agendamentoService: AgendamentoService) {}

  async init(): Promise<void> {

    const services = {
      "categorias": this.categoriaService,
      "usuarios": this.usuarioService,
      "cardapios": this.cardapioService,
      "agendamentos": this.agendamentoService
    }

    const values = [
      { "categorias": await this.categoriaService.getAll() },
      { "usuarios": await this.usuarioService.getAll() },
      { "cardapios": await this.cardapioService.getAll() },
      { "agendamentos": await this.agendamentoService.getAll() }
    ];

    values.forEach(element => {
      const value = Object.values(element)[0];
      if(value.length === 0) {
        const key = Object.keys(element)[0];
        data[key].forEach(async dataObject => await (services[key]).save(dataObject));
      }
    });
  }
}
