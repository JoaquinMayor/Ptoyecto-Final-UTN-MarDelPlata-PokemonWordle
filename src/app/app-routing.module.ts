import { NgModule, createComponent } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EasyWordleComponent } from './easy-wordle/easy-wordle.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UniquePokemonComponent } from './unique-pokemon/unique-pokemon.component';
import { LogginUserComponent } from './user/loggin-user/loggin-user.component';
import { UserSystemComponent } from './user/user-system/user-system.component';
import { HardWordleComponent } from './hard-wordle/hard-wordle.component';

const routes: Routes = [
  { path: 'wordleHard', component: HardWordleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'wordleEasy', component: EasyWordleComponent},
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokedex/pokemon/:id', component: UniquePokemonComponent},
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/logging', component: LogginUserComponent },
  { path: 'user/modify/:id', component: UserSystemComponent },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }