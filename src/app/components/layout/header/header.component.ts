import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/dark-mode.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService, public darkModeService: DarkModeService) { }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

}
