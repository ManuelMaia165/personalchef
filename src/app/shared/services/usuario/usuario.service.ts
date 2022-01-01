import { Usuario } from '../../model/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_USUARIOS = 'https://personal-cheff.herokuapp.com/usuarios';

  constructor(private httpClient: HttpClient) {
  }

  async getAll(): Promise<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.URL_USUARIOS).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: number): Promise<Usuario> {
    return this.httpClient.get<Usuario[]>(`${this.URL_USUARIOS}/${id}`).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(usuario: Usuario): Promise<Usuario> {
    return this.httpClient.put<Usuario>(this.URL_USUARIOS, usuario).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async save(usuario: Usuario): Promise<Usuario> {
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }
}
