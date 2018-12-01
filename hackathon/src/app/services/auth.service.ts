import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = null;
  currenUser: any;
  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
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

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => resolve (res.user.uid),
        err => reject (err));
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.authState = userData;
      })
      .catch(error => {
      });
  }

  getUsers() {
    return this.users;
  }

  addUserData(uid, name, email) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data: User = {
      uid: uid,
      name: name,
      email: email
    };
    return userRef.set(data).then(_ => {
      console.log('ok');
    }).catch(function(err) {
      console.log(err);
    });
  }
}
