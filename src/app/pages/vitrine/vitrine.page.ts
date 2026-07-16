import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: number;
  item: string;
  quantidade: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Recebido';
}

interface Ong {
  id: number;
  nome: string;
  descricao: string;
  whatsapp: string;
  email: string;
  tag: string;
  pedidos?: Pedido[]; 
  mostrarDetalhes?: boolean; 
}

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vitrine.page.html',
  styleUrls: ['./vitrine.page.css']
})
export class VitrinePage implements OnInit {
  ongsDinamicas: Ong[] = [];

  ngOnInit() {
    this.carregarOngs();
  }

  carregarOngs() {
    const dados = localStorage.getItem('ongs_conectaong');
    if (dados) {
      const listaOngs: Ong[] = JSON.parse(dados);
      
      this.ongsDinamicas = listaOngs.map(ong => {
        const pedidosSalvos = localStorage.getItem(`pedidos_conectaong_${ong.id}`);
        return {
          ...ong,
          pedidos: pedidosSalvos ? JSON.parse(pedidosSalvos) : [],
          mostrarDetalhes: false
        };
      });
    }
  }

  alternarDetalhes(ong: Ong) {
    ong.mostrarDetalhes = !ong.mostrarDetalhes;
  }
}