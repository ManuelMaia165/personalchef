import { Cardapio } from '../../model/cardapio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  URL_CARDAPIOS = 'https://personal-cheff.herokuapp.com/cardapios';

  constructor(private httpClient: HttpClient) {
  }

  async getAll(): Promise<Cardapio[]> {
    return this.httpClient.get<Cardapio[]>(this.URL_CARDAPIOS).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: number): Promise<Cardapio> {
    return this.httpClient.get<Cardapio[]>(`${this.URL_CARDAPIOS}/${id}`).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(cardapio: Cardapio): Promise<Cardapio> {
    return this.httpClient.put<Cardapio>(this.URL_CARDAPIOS, cardapio).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async save(cardapio: Cardapio): Promise<Cardapio> {
    return this.httpClient.post<Cardapio>(this.URL_CARDAPIOS, cardapio).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete<any>(`${this.URL_CARDAPIOS}/${id}`).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }
}
