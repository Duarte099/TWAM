import { Routes } from '@angular/router';
import { JogadoresList } from './jogadores/jogadores-list/jogadores-list';
import { JogadorDetails } from './jogadores/jogador-details/jogador-details';
import { JogadoresForm } from './jogadores/jogadores-form/jogadores-form';

export const routes: Routes = [
  { path: 'jogadores', component: JogadoresList },
  { path: 'jogadores/new', component: JogadoresForm },
  { path: 'jogadores/:id', component: JogadorDetails },
  { path: 'jogadores/:id/edit', component: JogadoresForm },

  //{ path: '', redirectTo: '/selecoes', pathMatch: 'full' },
];
