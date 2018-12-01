import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  authState = null;
  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth;
      });

      this.usersCollection = this.afs.collection('users');
      this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        });
      }));
      console.log(this.users);
    }

  public getTopUsers(): Observable<User[]> {
    return this.users;
  }
}
