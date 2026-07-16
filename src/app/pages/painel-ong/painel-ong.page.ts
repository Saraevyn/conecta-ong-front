import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  nomeOngLogada: string = '';
  ongIdLogada: number | null = null;

  novoItem: string = '';
  novaQuantidade: string = '';
  novaPrioridade: 'Alta' | 'Média' | 'Baixa' = 'Média';

  constructor(private router: Router) { }

  ngOnInit() {
    this.carregarDadosSessao();
  }

  carregarDadosSessao() {
    const dadosOng = localStorage.getItem('ong_logada');
    if (dadosOng) {
      const ong = JSON.parse(dadosOng);
      this.nomeOngLogada = ong.nome;
      this.ongIdLogada = ong.id;
      this.carregarPedidos();
    } else {
      this.router.navigate(['/']);
    }
  }

  carregarPedidos() {
    if (!this.ongIdLogada) return;

    const dadosSalvos = localStorage.getItem(`pedidos_conectaong_${this.ongIdLogada}`);

    if (dadosSalvos) {
      this.pedidos = JSON.parse(dadosSalvos);
    } else {
      this.pedidos = [];
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
    if (this.ongIdLogada) {
      localStorage.setItem(`pedidos_conectaong_${this.ongIdLogada}`, JSON.stringify(this.pedidos));
    }
  }
  
  efetuarLogout() {
    localStorage.removeItem('ong_logada');
    this.router.navigate(['/']);
  }

  excluirMinhaConta() {
    if (!this.ongIdLogada) return;

    const confirmacao = confirm('Deseja realmente excluir a conta da sua instituição e remover todos os seus pedidos ativos da Vitrine? Esta ação é irreversível.');

    if (confirmacao) {
      localStorage.removeItem(`pedidos_conectaong_${this.ongIdLogada}`);

      const dadosOngs = localStorage.getItem('ongs_conectaong');
      if (dadosOngs) {
        const ongs: Ong[] = JSON.parse(dadosOngs);
        const ongsFiltradas = ongs.filter(ong => ong.id !== this.ongIdLogada);
        localStorage.setItem('ongs_conectaong', JSON.stringify(ongsFiltradas));
      }
      localStorage.removeItem('ong_logada');
      this.router.navigate(['/']);
    }
  }
}