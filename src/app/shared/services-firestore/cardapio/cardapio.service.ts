import { Cardapio } from '../../model/cardapio';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  COLLECTION_NAME: string = "cardapios";

  constructor(private db: AngularFirestore) {}

  async getAll(): Promise<Cardapio[]> {
    return this.db.collection(this.COLLECTION_NAME).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: string): Promise<Cardapio> {
    return this.db.collection(this.COLLECTION_NAME).doc(id).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(cardapio: Cardapio): Promise<void> {
    return this.db.collection(this.COLLECTION_NAME).doc(cardapio.id).update(Object.assign({}, cardapio)).catch(erro =>
      console.error(erro)
    );
  }

  async save(cardapio: Cardapio): Promise<any> {
    return this.db.collection(this.COLLECTION_NAME).add(Object.assign({},cardapio)).catch(erro =>
      console.error(erro)
    );
  }
}
