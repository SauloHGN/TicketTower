import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Text Header
  private itemNameSource = new BehaviorSubject<string>(''); // Valor inicial vazio
  itemName$: Observable<string> = this.itemNameSource.asObservable(); // Observable para assinaturas

  // Método para atualizar o valor
  updateItemName(name: string) {
    this.itemNameSource.next(name);
  }

  // Método para obter o valor atual (não usado diretamente para exibição)
  getCurrentItemName(): string {
    return this.itemNameSource.getValue();
  }

  // Modal Confirmar Logout

  private modalSubject = new Subject<boolean>();
  modalState$ = this.modalSubject.asObservable();

  openModal() {
    this.modalSubject.next(true);
  }

  closeModal() {
    this.modalSubject.next(false);
  }

  // Modal Delete user

  private modalSubjectDelete = new Subject<boolean>();
  modalDeleteState$ = this.modalSubjectDelete.asObservable();

  openModalDelete() {
    this.modalSubjectDelete.next(true);
  }

  closeModalDelete() {
    this.modalSubject.next(false);
    this.deleteUserID = '';
  }

  editTypeUser: string = '';
  editIdUser: string = '';
  deleteUserID: string = '';

  getEditTypeUser() {
    return this.editTypeUser;
  }

  getEditIdUser() {
    return this.editIdUser;
  }

  setEditIdUser(id: string) {
    this.editIdUser = id;
  }

  setEditTypeUser(tipo: string) {
    this.editTypeUser = tipo;
  }

  setDeleteUserID(id: string) {
    this.deleteUserID = id;
  }

  getDeleteUserID() {
    return this.deleteUserID;
  }
}
