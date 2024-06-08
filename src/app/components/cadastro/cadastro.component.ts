import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  selectedType: string = ''; // Atributo que armazena o tipo selecionado

  // Métodos para verificar qual formulário deve ser mostrado com base no tipo selecionado
  showEmpresaForm(): boolean {
    return this.selectedType === 'empresa';
  }

  showClienteForm(): boolean {
    return this.selectedType === 'cliente';
  }

  showSetorForm(): boolean {
    return this.selectedType === 'setor';
  }

  showFuncionarioForm(): boolean {
    return this.selectedType === 'funcionario';
  }
}
