import { Component, OnInit } from '@angular/core';
import { Hackathon } from '../../interfaces/hackathon';
import { HackathonService } from '../../services/hackathon.service';

@Component({
  selector: 'app-hackathon',
  templateUrl: './hackathon.component.html',
  styleUrls: ['./hackathon.component.css']
})
export class HackathonComponent implements OnInit {

  hackathon: Hackathon[];

  constructor(private hackService: HackathonService) { }

  ngOnInit() {
    this.hackService.getHackthon().subscribe(hackathon => {
      this.hackathon = hackathon;
      console.log(this.hackathon);
    });
  }

}
