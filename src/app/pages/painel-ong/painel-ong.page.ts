import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id: number;
  item: string;
  quantidade: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Recebido';
}

@Component({
  selector: 'app-painel-ong',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './painel-ong.page.html',
  styleUrls: ['./painel-ong.page.css']
})
export class PainelOngPage implements OnInit {
  pedidos: Pedido[] = [];
  nomeOngLogada: string = 'Associação Anjos de Patas'; 
  novoItem: string = '';
  novaQuantidade: string = '';
  novaPrioridade: 'Alta' | 'Média' | 'Baixa' = 'Média';

  ngOnInit() {
    this.carregarPedidos();
    this.carregarNomeOng(); 
  }

  carregarNomeOng() {
    const dadosOng = localStorage.getItem('ong_logada');
    if (dadosOng) {
      const ong = JSON.parse(dadosOng);
      this.nomeOngLogada = ong.nome;
    }
  }

  carregarPedidos() {
    const dadosSalvos = localStorage.getItem('pedidos_conectaong');
    if (dadosSalvos) {
      this.pedidos = JSON.parse(dadosSalvos);
    } else {
      this.pedidos = [
        { id: 1, item: 'Arroz 5kg', quantidade: '15 sacos', prioridade: 'Alta', status: 'Pendente' },
        { id: 2, item: 'Leite Integral', quantidade: '40 caixas', prioridade: 'Média', status: 'Pendente' },
        { id: 3, item: 'Óleo de Cozinha', quantidade: '20 garrafas', prioridade: 'Baixa', status: 'Recebido' }
      ];
      this.salvarNoStorage();
    }
  }

  adicionarPedido() {
    if (!this.novoItem || !this.novaQuantidade) return;

    const novo: Pedido = {
      id: Date.now(), 
      item: this.novoItem,
      quantidade: this.novaQuantidade,
      prioridade: this.novaPrioridade,
      status: 'Pendente'
    };

    this.pedidos.unshift(novo); 
    this.salvarNoStorage();
    this.novoItem = '';
    this.novaQuantidade = '';
    this.novaPrioridade = 'Média';
  }

  alterarStatus(id: number) {
    const pedido = this.pedidos.find(p => p.id === id);
    if (pedido) {
      pedido.status = pedido.status === 'Pendente' ? 'Recebido' : 'Pendente';
      this.salvarNoStorage();
    }
  }

  excluirPedido(id: number) {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
    this.salvarNoStorage();
  }

  salvarNoStorage() {
    localStorage.setItem('pedidos_conectaong', JSON.stringify(this.pedidos));
  }
}