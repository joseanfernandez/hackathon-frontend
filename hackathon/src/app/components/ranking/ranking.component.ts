import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RankingService } from '../../services/ranking.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: []
})
export class RankingComponent implements OnInit, OnDestroy {

  private _topUsers: User[] = [];
  public get topUsers() { return this._topUsers; }
  private _rankingGetTopUsers: Subscription;

  constructor(public ranking: RankingService) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    if (this._rankingGetTopUsers !== undefined) {
      this._rankingGetTopUsers.unsubscribe();
    }
  }

  private loadUsers() {
    this._rankingGetTopUsers = this.ranking.getTopUsers().subscribe((users: User[]) => {
      this._topUsers = [...users];
      this.topUsers.sort((a: any, b: any) => {
        if ( a.score > b.score ) {
          return -1;
        } else if ( a.score < b.score ) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }
}
