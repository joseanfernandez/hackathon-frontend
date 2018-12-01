import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: []
})
export class RankingComponent implements OnInit {

  private _topUsers: any[] = [];
  public get topUsers() { return this._topUsers; }

  constructor() { }

  ngOnInit() {
    this.generateHardcodeUsers();
  }

  generateHardcodeUsers() {
    for (let i = 1; i <= 20; i++) {
      this._topUsers.push({
        name: 'Nombre ' + i,
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
