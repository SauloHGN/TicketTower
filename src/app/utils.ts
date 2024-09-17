import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
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
}
