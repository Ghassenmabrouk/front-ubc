import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  showMore1: boolean = false;
  showMore2: boolean = false;
  showMore3: boolean = false;
  showMore4: boolean = false;

  toggleReadMore(section: 'showMore1' | 'showMore2' | 'showMore3' | 'showMore4'): void {
    this[section] = !this[section];
  }
}
