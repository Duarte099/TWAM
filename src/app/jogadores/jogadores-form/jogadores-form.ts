import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JogadorService } from '../jogador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelecaoService } from '../../selecoes/selecao';

@Component({
  selector: 'app-jogadores-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './jogadores-form.html',
  styleUrl: './jogadores-form.css',
})
export class JogadoresForm implements OnInit {
  modoEdicao = false;
  idJogador: string | null = null;
  jogador: any = {};
  selecoes: any[] = [];
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private JogadorService: JogadorService,
    private SelecaoService: SelecaoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.idJogador = this.route.snapshot.paramMap.get('id');
    this.carregarSelecoes();
    if (this.idJogador) {
      this.modoEdicao = true;
      this.carregarJogador();
    }
  }

  carregarJogador() {
    this.JogadorService.getJogador(this.idJogador!).subscribe({
      next: (j: any) => {
        this.jogador = j;
        this.loading.set(false);
      },

      error: (err) => {
        this.router.navigate(['/jogadores'], {
          state: { mensagem: 'Jogador não encontrado' },
        });
      },
    });
  }

  carregarSelecoes() {
    this.SelecaoService.getSelecoes().subscribe((s) => {
      this.selecoes = s;
      if (!this.modoEdicao) {
        this.loading.set(false);
      }
    });
  }

  guardarDados() {
    if (this.modoEdicao) {
      this.JogadorService.updateJogador(this.idJogador!, this.jogador).subscribe(() => {
        alert('Jogador atualizado com sucesso!');
        this.router.navigate(['/jogadores']);
      });
    } else {
      this.JogadorService.createJogador(this.jogador).subscribe(() => {
        alert('Jogador criado com sucesso!');
        this.router.navigate(['/jogadores']);
      });
    }
  }
}
