import { Usuario } from '../../model/usuario';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  COLLECTION_NAME: string = "usuarios";

  constructor(private db: AngularFirestore) {}

  async getAll(): Promise<Usuario[]> {
    return this.db.collection(this.COLLECTION_NAME).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async get(id: string): Promise<Usuario> {
    return this.db.collection(this.COLLECTION_NAME).doc(id).valueChanges().pipe(catchError(erro => {
      console.error(erro);
      return of(undefined);
    })).pipe(first()).toPromise();
  }

  async update(usuario: Usuario): Promise<void> {
    return this.db.collection(this.COLLECTION_NAME).doc(usuario.id).update(Object.assign({}, usuario)).catch(erro =>
      console.error(erro)
    );
  }

  async save(usuario: Usuario): Promise<any> {
    return this.db.collection(this.COLLECTION_NAME).add(Object.assign({},usuario)).catch(erro =>
      console.error(erro)
    );
  }
}
