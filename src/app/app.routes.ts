import { Routes } from '@angular/router';
import { JogadoresList } from './jogadores/jogadores-list/jogadores-list';
import { JogadorDetails } from './jogadores/jogador-details/jogador-details';
import { JogadoresForm } from './jogadores/jogadores-form/jogadores-form';
import { SelecoesList } from './selecoes/selecoes-list/selecoes-list';
import { SelecoesForm } from './selecoes/selecoes-form/selecoes-form';
import { SelecaoDetails } from './selecoes/selecoes-details/selecoes-details';

export const routes: Routes = [
  { path: 'jogadores', component: JogadoresList },
  { path: 'jogadores/new', component: JogadoresForm },
  { path: 'jogadores/:id', component: JogadorDetails },
  { path: 'jogadores/:id/edit', component: JogadoresForm },
  { path: '', redirectTo: '/selecoes', pathMatch: 'full' },
  { path: 'selecoes', component: SelecoesList },
  { path: 'selecoes/new', component: SelecoesForm},
  { path: 'selecoes/:id', component: SelecaoDetails },
  { path: 'selecoes/:id/edit', component: SelecoesForm }
];
