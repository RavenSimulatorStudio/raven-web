import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  navigateToChildPage1() {
    this.router.navigate(['/customers/list']);
  }

  logout() {
    this.userService.logout()
  }
}
