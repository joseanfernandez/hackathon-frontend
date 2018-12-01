import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User2 } from 'src/app/interfaces/user2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  users: User2[];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.email = null;
    this.password = null;
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      alert('Logged');
    });
  }

}
