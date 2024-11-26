import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../sharedService';
import { HttpClient } from '@angular/common/http';
import { GerenciarUsuariosComponent } from '../gerenciar-usuarios/gerenciar-usuarios.component';

@Component({
  selector: 'app-modal-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-user.component.html',
  styleUrl: './modal-delete-user.component.css',
})
export class ModalDeleteUserComponent implements OnInit {
  constructor(public sharedService: SharedService, public http: HttpClient) {}

  ngOnInit() {
    this.sharedService.modalDeleteState$.subscribe((isOpen) => {
      console.log('Modal state changed:', isOpen);
      this.openDelete = isOpen;
    });
  }
  openDelete = false;

  openModalDelete() {
    this.openDelete = true;
  }

  async deleteUser() {
    const userInfo = await sessionStorage.getItem('userInfo');
    if (userInfo) {
      var user = JSON.parse(userInfo);
    }

    try {
      this.http
        .delete(
          `http://localhost:3000/users/${user}/${this.sharedService.getDeleteUserID()}`
        )
        .subscribe((response) => {});
    } catch (error) {}

    this.closeModalDelete();
  }

  closeModalDelete() {
    this.openDelete = false;
  }
}
