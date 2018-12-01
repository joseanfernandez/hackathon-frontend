import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;
  password_bis: string;
  name: string;
  lastName: string;
  score: number;
  uid: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.password_bis = '';
    this.name = '';
    this.lastName = '';
    this.score = 0;
  }

  registro() {
    if (this.password === this.password_bis) {
      this.authService.registerUser(this.email, this.password_bis).then( (res) => {
        this.uid = res;
        this.addUserData();
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  addUserData() {
    this.authService.addUserData(this.uid, this.name, this.email).then(() => {
      console.log('Success!');
    });
  }



}
