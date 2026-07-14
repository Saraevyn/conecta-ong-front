import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Ong {
  id: number;
  nome: string;
  descricao: string;
  whatsapp: string;
  email: string;
  tag: string;
}

@Component({
  selector: 'app-login-ong',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-ong.page.html',
  styleUrls: ['./login-ong.page.css']
})
export class LoginOngPage implements OnInit {

  nomeOng: string = '';
  descOng: string = '';
  telOng: string = '';
  emailCad: string = '';
  passCad: string = '';


  emailLogin: string = '';
  passLogin: string = '';

  ongsCadastradas: Ong[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.carregarOngs();
  }

  carregarOngs() {
    const dados = localStorage.getItem('ongs_conectaong');
    if (dados) {
      this.ongsCadastradas = JSON.parse(dados);
    }
  }

  solicitarCadastro() {
    if (!this.nomeOng || !this.emailCad) return;

    const novaOng: Ong = {
      id: Date.now(),
      nome: this.nomeOng,
      descricao: this.descOng || 'Instituição parceira do ConectaONG.',
      whatsapp: this.telOng || '47999999999',
      email: this.emailCad,
      tag: 'Apoio Comunitário'
    };

    this.ongsCadastradas.push(novaOng);
    localStorage.setItem('ongs_conectaong', JSON.stringify(this.ongsCadastradas));

    localStorage.setItem('ong_logada', JSON.stringify(novaOng));


    this.nomeOng = '';
    this.descOng = '';
    this.telOng = '';
    this.emailCad = '';
    this.passCad = '';


    this.router.navigate(['/painel']);
  }

  entrarNoSistema() {

    const ongEncontrada = this.ongsCadastradas.find(ong => ong.email === this.emailLogin);

    if (ongEncontrada) {
      localStorage.setItem('ong_logada', JSON.stringify(ongEncontrada));
    } else {

      const ongMock: Ong = {
        id: 1,
        nome: "Associação Anjos de Patas",
        descricao: "Atuamos no resgate e promoção de adoção responsável.",
        whatsapp: "47999992026",
        email: this.emailLogin || 'anjos@patas.org',
        tag: "Causa Animal"
      };
      localStorage.setItem('ong_logada', JSON.stringify(ongMock));
    }

    this.router.navigate(['/painel']);
  }
}