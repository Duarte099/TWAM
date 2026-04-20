import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JogadorService } from '../jogador';
import { SelecaoService } from '../../selecoes/selecao';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogador-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './jogador-details.html',
})
export class JogadorDetails implements OnInit {
  jogador = signal<any | null>(null);
  loading = signal(true);
  selecaoMap: any = {};

  constructor(
    private jogadorService: JogadorService,
    private selecaoService: SelecaoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.selecaoService.getSelecoes().subscribe((selecoes: any[]) => {
      selecoes.forEach((s) => {
        this.selecaoMap[s.id] = s.country;
      });

      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (!id) {
          return;
        }

        this.jogadorService.getJogador(id).subscribe({
          next: (j: any) => {
            const mapped = {
              id: j.id,
              foto: j.fotoUrl,
              selecao: this.selecaoMap[j.teamId],
              nome: j.name,
              dataNascimento: j.birthDate,
              idade: this.obterIdade(j.birthDate),
              numero: j.number,
              posicao: j.position,
              clube: j.club,
              numJogos: j.caps,
              numGolos: j.goals,
              titular: j.isStartingXI,
            };

            this.jogador.set(mapped);
            this.loading.set(false);
          },

          error: (err) => {
            this.router.navigate(['/jogadores'], {
              state: { mensagem: 'Jogador não encontrado' },
            });
          },
        });
      });
    });
  }

  obterIdade(birthDate: string): number {
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
}
