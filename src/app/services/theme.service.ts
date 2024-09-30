import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private lightTheme = false;

  constructor() {
    this.loadTheme();
  }

  switchTheme() {
    this.lightTheme = !this.lightTheme;
    this.updateTheme();
    localStorage.setItem('lightTheme', JSON.stringify(this.lightTheme));
    //console.log('Tema armazenado:', localStorage.getItem('lightTheme'));
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('lightTheme');
    //console.log('Tema Carregado:', localStorage.getItem('lightTheme'));
    this.lightTheme = savedTheme === 'true';
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('light', this.lightTheme);
  }
}
