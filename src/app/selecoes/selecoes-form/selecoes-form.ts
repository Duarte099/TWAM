import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelecaoService } from '../selecao';

@Component({
  selector: 'app-selecoes-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './selecoes-form.html',
})
export class SelecoesForm implements OnInit {
  modoEdicao = false;
  idSelecao: string | null = null;
  selecao: any = {};
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private SelecaoService: SelecaoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.idSelecao = this.route.snapshot.paramMap.get('id');
    if (this.idSelecao) {
      this.modoEdicao = true;
      this.carregarSelecao();
    } else {
      this.loading.set(false);
    }
  }

  carregarSelecao() {
    this.SelecaoService.getSelecao(this.idSelecao!).subscribe({
      next: (s: any) => {
        this.selecao = s;
        this.loading.set(false);
      },
      error: (err) => {
        this.router.navigate(['/selecoes'], {
          state: { mensagem: 'Seleção não encontrada' },
        });
      },
    });
  }

  guardarDados() {
    if (this.modoEdicao) {
      this.SelecaoService.updateSelecao(this.idSelecao!, this.selecao).subscribe(() => {
        alert('Seleção atualizada com sucesso!');
        this.router.navigate(['/selecoes']);
      });
    } else {
      this.SelecaoService.createSelecao(this.selecao).subscribe(() => {
        alert('Seleção criada com sucesso!');
        this.router.navigate(['/selecoes']);
      });
    }
  }
}
