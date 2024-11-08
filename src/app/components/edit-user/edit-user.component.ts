import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideBarcode,
  lucideBuilding,
  lucideBus,
  lucideGripHorizontal,
  lucideLocate,
  lucideMail,
  lucideMapPinned,
  lucidePenLine,
  lucidePhone,
  lucideQrCode,
  lucideUserRound,
} from '@ng-icons/lucide';
import { SharedService } from '../../sharedService';
import { Permissao } from '../../enum/permissao';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',

  viewProviders: [
    provideIcons({
      lucideBuilding,
      lucideMail,
      lucideQrCode,
      lucideMapPinned,
      lucideGripHorizontal,
      lucideLocate,
      lucideBus,
      lucideBarcode,
      lucidePhone,
      lucideUserRound,
      lucidePenLine,
    }),
  ],
})
export class EditUserComponent implements OnInit {
  tipoUsuario = '';
  setores?: any[];
  selectedSetor: any;

  empresas?: any[];
  selectedEmpresa: any;

  valorPermissao: any = Permissao; // Propriedade para armazenar o valor selecionado
  enumValues = Object.values(Permissao); // Array com os valores do enum
  enum = Permissao;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  ngOnInit() {
    this.tipoUsuario = this.sharedService.getEditTypeUser();

    this.http.get<any[]>('http://localhost:3000/setores').subscribe((data) => {
      this.setores = data;
    });

    this.http.get<any[]>('http://localhost:3000/empresas').subscribe((data) => {
      this.empresas = data;
    });
  }

  updateUser(tipoUsuario: string){
    if(tipoUsuario == 'cliente'){


      return;
    }

    

  }
}
