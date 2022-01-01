import { Categoria } from '../../model/Categoria';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  URL_CATEGORIAS = 'http://localhost:3000/categorias';

  constructor(private httpClient: HttpClient) {
  }

  async getAll(): Promise<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.URL_CATEGORIAS).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: number): Promise<Categoria> {
    return this.httpClient.get<Categoria[]>(`${this.URL_CATEGORIAS}/${id}`).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(categoria: Categoria): Promise<Categoria> {
    return this.httpClient.put<Categoria>(this.URL_CATEGORIAS, categoria).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async save(categoria: Categoria): Promise<Categoria> {
    return this.httpClient.post<Categoria>(this.URL_CATEGORIAS, categoria).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }
}
