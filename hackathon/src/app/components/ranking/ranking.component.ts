import { Component, OnInit } from '@angular/core';

import { RankingService } from '../../services/ranking.service';
import { User } from '../../intefaces/user';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: []
})
export class RankingComponent implements OnInit {

  private _topUsers: User[] = [];
  public get topUsers() { return this._topUsers; }

  constructor(public ranking: RankingService) { }

  ngOnInit() {
    this.generateHardcodeUsers();
    this.ranking.getTopUsers().subscribe((users: User[]) => {
      this._topUsers = [...users];
    });
  }

  generateHardcodeUsers() {
    for (let i = 1; i <= 20; i++) {
      this._topUsers.push({
        id: `$(i)`,
        name: 'Nombre ' + i,
        lastname: 'Apellido',
        email: 'user@mail.com',
        score: Math.ceil(Math.random() * 10000)
      });
    }
    this.sortUsers();
  }

  private sortUsers(): void {
    this._topUsers.sort((a: any, b: any) => {
      if ( a.score > b.score ) {
        return -1;
      } else if ( a.score < b.score ) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
