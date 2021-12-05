import { Categoria } from '../../model/categoria';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  COLLECTION_NAME: string = "categorias";

  constructor(private db: AngularFirestore) {}

  async getAll(): Promise<Categoria[]> {
    return this.db.collection(this.COLLECTION_NAME).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: string): Promise<Categoria> {
    return this.db.collection(this.COLLECTION_NAME).doc(id).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(categoria: Categoria): Promise<void> {
    return this.db.collection(this.COLLECTION_NAME).doc(categoria.id).update(Object.assign({}, categoria)).catch(erro =>
      console.error(erro)
    );
  }

  async save(categoria: Categoria): Promise<any> {
    return this.db.collection(this.COLLECTION_NAME).add(Object.assign({},categoria)).catch(erro =>
      console.error(erro)
    );
  }
}
