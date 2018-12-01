import { Component, OnInit } from '@angular/core';
import { Hackathon } from '../../interfaces/hackathon';

@Component({
  selector: 'app-create-hackathon',
  templateUrl: './create-hackathon.component.html',
  styles: []
})
export class CreateHackathonComponent implements OnInit {

  private _hackathon: Hackathon;
  public get hackathon() { return this._hackathon; }

  constructor() { }

  ngOnInit() {
    this._hackathon = {
      id: '',
      title: '',
      technology: '',
      date: '',
      notes: ''
    };
  }

  public submit(): void {
  }

}
