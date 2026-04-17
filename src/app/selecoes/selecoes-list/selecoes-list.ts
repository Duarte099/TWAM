import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelecaoService } from '../../selecoes/selecao';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selecoes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './selecoes-list.html',
  styleUrl: './selecoes-list.css',
})
export class SelecoesList implements OnInit {
  selecoes = signal<any[]>([]);
  loading = signal(true);
  orderBy: string = '';
  isAsc: boolean = true;

  constructor(
    private SelecaoService: SelecaoService,
  ) {}

  ngOnInit(): void {
    this.SelecaoService.getSelecoes().subscribe((selecoes: any[]) => {
      const mapped = selecoes.map((s) => ({
        id: s.id,
        flag: s.flagUrl,
        pais: s.country,
        confederacao: s.confederation,
        treinador: s.coach,
        rankingFifa: s.fifaRanking,
      }));

      this.selecoes.set(mapped);
      this.loading.set(false);
    });
  }

  apagarSelecao(id: string) {
    if (confirm('Tens a certeza que queres apagar a seleção?')) {
      this.SelecaoService.deleteSelecao(id).subscribe(() => {
        this.selecoes.set(this.selecoes().filter((s) => s.id !== id));
      });
    }
  }

  ordenar() {
    const lista = [...this.selecoes()];

    lista.sort((a: any, b: any) => {
      let result = 0;

      switch (this.orderBy) {
        case 'pais':
          result = a.pais.localeCompare(b.pais);
          break;

        case 'confederacao':
          result = a.confederacao.localeCompare(b.confederacao);
          break;

        case 'treinador':
          result = a.treinador.localeCompare(b.treinador);
          break;

        case 'rankingFifa':
          result = a.rankingFifa - b.rankingFifa;
          break;
      }

      return this.isAsc ? result : -result;
    });

    this.selecoes.set(lista);
  }

  toggleOrder() {
    this.isAsc = !this.isAsc;
    this.ordenar();
  }
}
