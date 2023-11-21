import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { Router, NavigationEnd } from '@angular/router';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carpool_frontend';
  constructor(private router: Router, private scriptLoaderService: ScriptLoaderService, private darkModeService: DarkModeService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scriptLoaderService.loadScript('assets/js/main.js')
          .then(() => {
            console.log('main.js is reloaded');
          })
          .catch(error => console.error('error reloading script:', error));
      }
    });

    this.updateDarkModeClass();
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    this.updateDarkModeClass();
  }

  private updateDarkModeClass() {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkModeService.getIsDarkMode()) {
      body.classList.add('cs-dark');
    } else {
      body.classList.remove('cs-dark');
    }
  }
}
