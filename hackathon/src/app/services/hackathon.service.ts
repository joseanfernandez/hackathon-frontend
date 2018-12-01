import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Hackathon } from '../interfaces/hackathon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackathonService {

  hackthon: Observable<Hackathon[]>;
  hackthonCollection: AngularFirestoreCollection<Hackathon>;

  constructor(private afs: AngularFirestore) {
    this.hackthonCollection = this.afs.collection('hackathon');
    this.hackthon = this.hackthonCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Hackathon;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getHackthon() {
    return this.hackthon;
  }

  addHackathon(title, technology, date, notes) {
    const hackthonRef: AngularFirestoreDocument<Hackathon> = this.afs.doc('hackathon');
    const data: Hackathon = {
      title: title,
      technology: technology,
      date: date,
      notes: notes
    };
    return hackthonRef.set(data).then(_ => {
      console.log('ok');
    }).catch(function(err) {
      console.log(err);
    });
  }
}
