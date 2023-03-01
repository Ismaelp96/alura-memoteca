import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      });
  }
  pesquisarPensamento() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((buscarPensamento) => {
        this.listaPensamentos = buscarPensamento;
      });
  }

  recarregarPensamentos() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.navigate([this.router.url]);
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favoritos = true;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((buscarFavoritos) => {
        this.listaPensamentos = buscarFavoritos;
        this.listaFavoritos = buscarFavoritos;
      });
  }
}
