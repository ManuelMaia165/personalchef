import { Agendamento } from '../../model/agendamento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  URL_AGENDAMENTOS = 'https://personal-cheff.herokuapp.com/agendamentos';

  constructor(private httpClient: HttpClient) {
  }

  async getAll(): Promise<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.URL_AGENDAMENTOS).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: number): Promise<Agendamento> {
    return this.httpClient.get<Agendamento[]>(`${this.URL_AGENDAMENTOS}/${id}`).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(agendamento: Agendamento): Promise<Agendamento> {
    return this.httpClient.put<Agendamento>(this.URL_AGENDAMENTOS, agendamento).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async save(agendamento: Agendamento): Promise<Agendamento> {
    return this.httpClient.post<Agendamento>(this.URL_AGENDAMENTOS, agendamento).pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }
}
