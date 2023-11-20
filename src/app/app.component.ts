import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from './script-loader.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'carpool_frontend';
  constructor(private router: Router, private scriptLoaderService: ScriptLoaderService) {}

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
  }
}
