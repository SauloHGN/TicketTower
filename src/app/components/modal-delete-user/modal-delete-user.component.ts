import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../sharedService';

@Component({
  selector: 'app-modal-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-user.component.html',
  styleUrl: './modal-delete-user.component.css',
})
export class ModalDeleteUserComponent implements OnInit {
  constructor(public sharedService: SharedService) {}

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

  deleteUser() {
    
    this.closeModalDelete();
  }

  closeModalDelete() {
    this.openDelete = false;
  }
}
