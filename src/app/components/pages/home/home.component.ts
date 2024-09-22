import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../sidebars/admin-sidebar/admin-sidebar.component';
import { FuncionarioSidebarComponent } from '../../sidebars/funcionario-sidebar/funcionario-sidebar.component';
import { ClienteSidebarComponent } from '../../sidebars/cliente-sidebar/cliente-sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { TarefasComponent } from '../../tarefas/tarefas.component';
import { CadastroComponent } from '../../cadastro/cadastro.component';
import { userInfo } from '../../../enum/userInfo';
import { ModalLogoutComponent } from '../../modal-logout/modal-logout.component';
import { ModalDeleteUserComponent } from '../../modal-delete-user/modal-delete-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TarefasComponent,
    CadastroComponent,
    AdminSidebarComponent,
    FuncionarioSidebarComponent,
    ClienteSidebarComponent,
    CommonModule,
    ModalLogoutComponent,
    ModalDeleteUserComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Homepage';

  userInfo: userInfo | null = null;

  ngOnInit(): void {
    const userInfo = sessionStorage.getItem('userInfo');

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  getSidebarType() {
    //console.log(this.userInfo?.permissao);
    if (!this.userInfo) return null;
    switch (this.userInfo.permissao) {
      case 'administrador':
        return 'admin';
      case 'analista':
        return 'funcionario';
      case 'cliente':
        return 'cliente';
      default:
        return null;
    }
  }
}
