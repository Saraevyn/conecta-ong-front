import { Routes } from '@angular/router';
import { VitrinePage } from './pages/vitrine/vitrine.page';
import { LoginOngPage } from './pages/login-ong/login-ong.page';
import { PainelOngPage } from './pages/painel-ong/painel-ong.page';

export const routes: Routes = [

  { path: '', component: VitrinePage },
  { path: 'vitrine', redirectTo: '', pathMatch: 'full' }, 

  { path: 'login', component: LoginOngPage },

  { path: 'painel', component: PainelOngPage },

  { path: '**', redirectTo: '' }
];