import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SelecaoService } from '../selecao';
import { JogadorService } from '../../jogadores/jogador';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecao-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './selecoes-details.html',
})
export class SelecaoDetails implements OnInit {
  selecao = signal<any | null>(null);
  jogadores = signal<any[]>([]);
  loading = signal(true);

  constructor(
    private selecaoService: SelecaoService,
    private JogadorService: JogadorService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        return;
      }

      this.selecaoService.getSelecao(id).subscribe({
        next: (s: any) => {
          const mapped = {
            id: s.id,
            bandeira: s.flagUrl,
            pais: s.country,
            confederacao: s.confederation,
            selecionador: s.coach,
            rankingFifa: s.fifaRanking,
          };

          this.selecao.set(mapped);

          this.JogadorService.getJogadores().subscribe({
            next: (jogadores: any[]) => {
              const filtrados = jogadores
                .filter((j) => j.teamId == id)
                .map((j) => ({
                  id: j.id,
                  foto: j.fotoUrl,
                  nome: j.name,
                  posicao: j.position,
                  numero: j.number,
                  clube: j.club,
                  titular: j.isStartingXI,
                  golos: j.goals,
                  jogos: j.caps,
                }))
                .sort((a, b) => Number(b.titular) - Number(a.titular));

              this.jogadores.set(filtrados);
              this.loading.set(false);
            }
          });

          this.loading.set(false);
        },

        error: (err) => {
          this.router.navigate(['/selecoes'], {
            state: { mensagem: 'Seleção não encontrada' },
          });
        },
      });
    });
  }
}
