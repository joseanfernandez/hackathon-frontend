import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { User2 } from '../interfaces/user2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = null;
  currenUser: any;
  users: Observable<User2[]>;
  usersCollection: AngularFirestoreCollection<User2>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });

    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('lastName'));
    this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User2;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.authState = userData;
      })
      .catch(error => {
      });
  }
}
