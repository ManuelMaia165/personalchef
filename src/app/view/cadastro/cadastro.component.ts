import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/model/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
