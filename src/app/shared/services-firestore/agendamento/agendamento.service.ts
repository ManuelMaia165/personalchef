import { Agendamento } from '../../model/agendamento';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  COLLECTION_NAME: string = "agendamentos";

  constructor(private db: AngularFirestore) {}

  async getAll(): Promise<Agendamento[]> {
    return this.db.collection(this.COLLECTION_NAME).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: string): Promise<Agendamento> {
    return this.db.collection(this.COLLECTION_NAME).doc(id).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(agendamento: Agendamento): Promise<void> {
    return this.db.collection(this.COLLECTION_NAME).doc(agendamento.id).update(Object.assign({}, agendamento)).catch(erro =>
      console.error(erro)
    );
  }

  async save(agendamento: Agendamento): Promise<any> {
    return this.db.collection(this.COLLECTION_NAME).add(Object.assign({},agendamento)).catch(erro =>
      console.error(erro)
    );
  }
}
