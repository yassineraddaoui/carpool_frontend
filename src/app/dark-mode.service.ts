import { Injectable } from '@angular/core';

const DARK_MODE_KEY = 'darkMode';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private isDarkMode: boolean = JSON.parse(localStorage.getItem(DARK_MODE_KEY) || 'true');


  constructor() {
    this.isDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_KEY) || 'true');
  }

  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(DARK_MODE_KEY, String(this.isDarkMode));
  }
}