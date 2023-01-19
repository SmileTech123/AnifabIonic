import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnimeComponent } from './anime/anime.component';
import { GuardaComponent } from './guarda/guarda.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'disconnect',
    component: LoginComponent,
  },
  {
    path: 'anime',
    component: AnimeComponent,
  },
  {
    path: 'guarda',
    component: GuardaComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
