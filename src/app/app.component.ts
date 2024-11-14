// app.component.ts

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adnen';
  showPreloadVideo: boolean = true;

  constructor(private router: Router) {
  
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPreloadVideo = event.url === '/';
      }
    });
  }

  onRouteChange(): void {
    // This method will be triggered when the route changes
    this.showPreloadVideo = this.router.url === '/home';
  }

  // Method to switch languages
 
}
