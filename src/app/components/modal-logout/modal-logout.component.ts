import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../sharedService';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-logout.component.html',
  styleUrl: './modal-logout.component.css',
})
export class ModalLogoutComponent implements OnInit {
  isOpen: boolean = false;

  constructor(
    public sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedService.modalState$.subscribe((isOpen) => {
      console.log('Modal state changed:', isOpen);
      this.isOpen = isOpen;
    });
  }

  logout() {
    console.log('Logging out...');
    this.sharedService.closeModal();

    this.authService.Logout();
    this.router.navigate(['/']); // Redirecionar para a landing page
  }
}
