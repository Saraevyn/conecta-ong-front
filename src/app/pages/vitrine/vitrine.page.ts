import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, CommonModule], 
  templateUrl: './vitrine.page.html',
  styleUrls: ['./vitrine.page.css']
})
export class VitrinePage implements OnInit {

  // ---> NOVA VARIÁVEL PARA O MENU MOBILE <---
  menuAberto: boolean = false;

  ongsEstaticas: Ong[] = [
    { 
      id: 1, 
      nome: 'Anjos de Patas', 
      descricao: 'Atuamos no resgate, tratamento e promoção de adoção responsável para animais domésticos abandonados e vítimas de maus-tratos.', 
      whatsapp: '47999992026', 
      email: 'anjos@patas.org', 
      tag: 'Causa Animal' 
    },
    { 
      id: 2, 
      nome: 'Amigos do Prato', 
      descricao: 'Distribuição de refeições prontas, cestas básicas e amparo básico para famílias e pessoas que vivem em situação de extrema vulnerabilidade social.', 
      whatsapp: '47999992027', 
      email: 'amigos@prato.org', 
      tag: 'Segurança Alimentar' 
    },
    { 
      id: 3, 
      nome: 'Lar da Esperança', 
      descricao: 'Espaço de acolhimento focado em oferecer dignidade, oficinas culturais, suporte médico e carinho para idosos da comunidade local.', 
      whatsapp: '47999992028', 
      email: 'lar@esperanca.org', 
      tag: 'Apoio Comunitário' 
    }
  ];

  ongsDinamicas: Ong[] = [];

  ngOnInit() {
    this.carregarOngsDinamicas();
  }

  // ---> NOVA FUNÇÃO PARA ABRIR E FECHAR O MENU <---
  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  carregarOngsDinamicas() {
    const dados = localStorage.getItem('ongs_conectaong');
    if (dados) {
      this.ongsDinamicas = JSON.parse(dados);
    }
  }
}