import { Component, OnInit } from '@angular/core';
import { Hackathon } from '../../interfaces/hackathon';

@Component({
  selector: 'app-create-hackathon',
  templateUrl: './create-hackathon.component.html',
  styles: []
})
export class CreateHackathonComponent implements OnInit {

  private _hackathon: Hackathon;
  private _send = false;
  public get hackathon() { return this._hackathon; }

  constructor() { }

  ngOnInit() {
    this.reset();
  }

  public submit(): void {
    this._send = true;
    this.checkValue();
  }

  private checkValue(): boolean {
    return this.checkTitleValue() && this.checkTechnologyValue() &&
        this.checkDateValue();
  }

  private checkTitleValue() {
    return !this._send || this._hackathon.title !== '';
  }

  private checkTechnologyValue() {
    return !this._send || this._hackathon.technology !== '';
  }

  private checkDateValue() {
    return !this._send || this._hackathon.date !== '';
  }

  public reset(): void {
    this._hackathon = {
      id: '',
      title: '',
      technology: '',
      date: '',
      notes: ''
    };
  }
}
