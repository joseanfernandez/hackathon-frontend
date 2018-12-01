import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HackathonComponent } from './components/hackathon/hackathon.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  {path: '', redirectTo: 'ranking', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'hackathon', component: HackathonComponent},
  {path: 'ranking', component: RankingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
