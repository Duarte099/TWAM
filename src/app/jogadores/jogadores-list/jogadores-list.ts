import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogadorService } from '../jogador';
import { SelecaoService } from '../../selecoes/selecao';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jogadores-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './jogadores-list.html',
  styleUrl: './jogadores-list.css',
})
export class JogadoresList implements OnInit {
  jogadores = signal<any[]>([]);
  loading = signal(true);
  selecaoMap: any = {};
  orderBy: string = '';
  isAsc: boolean = true;

  constructor(
    private JogadorService: JogadorService,
    private SelecaoService: SelecaoService,
  ) {}

  ngOnInit(): void {
    this.SelecaoService.getSelecoes().subscribe((selecoes: any[]) => {
      selecoes.forEach((s) => {
        this.selecaoMap[s.id] = s.country;
      });

      this.JogadorService.getJogadores().subscribe((response: any[]) => {
        const mapped = response.map((j) => ({
          id: j.id,
          foto: j.fotoUrl,
          idSelecao: j.teamId,
          selecao: this.selecaoMap[j.teamId],
          nome: j.name,
          idade: this.obterIdadeJogador(j.birthDate),
          numero: j.number,
          posicao: j.position,
          clube: j.club,
          numJogos: j.caps,
          numGolos: j.goals,
          titular: j.isStartingXI,
        }));

        this.jogadores.set(mapped);
        this.loading.set(false);
      });
    });
  }

  obterIdadeJogador(birthDate: string): number {
    const dataNascimento = new Date(birthDate);
    const hoje = new Date();

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    const mesNascimento = dataNascimento.getMonth();
    const diaNascimento = dataNascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }

    return idade;
  }

  apagarJogador(id: string) {
    if (confirm('Tens a certeza que queres apagar o jogador?')) {
      this.JogadorService.deleteJogador(id).subscribe(() => {
        this.jogadores.set(this.jogadores().filter((j) => j.id !== id));
      });
    }
  }

  ordenar() {
    const lista = [...this.jogadores()];

    lista.sort((a: any, b: any) => {
      let result = 0;

      switch (this.orderBy) {
        case 'nome':
          result = a.nome.localeCompare(b.nome);
          break;

        case 'idade':
          result = a.idade - b.idade;
          break;

        case 'numero':
          result = a.numero - b.numero;
          break;

        case 'posicao':
          result = a.posicao.localeCompare(b.posicao);
          break;

        case 'clube':
          result = a.clube.localeCompare(b.clube);
          break;

        case 'numJogos':
          result = a.numJogos - b.numJogos;
          break;

        case 'numGolos':
          result = a.numGolos - b.numGolos;
          break;
      }

      return this.isAsc ? result : -result;
    });

    this.jogadores.set(lista);
  }

  toggleOrder() {
    this.isAsc = !this.isAsc;
    this.ordenar();
  }
}
