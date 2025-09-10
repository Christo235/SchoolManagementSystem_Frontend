import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) { }
  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('studentId');
  }

  get studentName(): string {
    return sessionStorage.getItem('studentName') || 'Student';
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/homepage']);
  }

}
