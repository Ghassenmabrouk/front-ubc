import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isRtl: boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event) => {
      this.isRtl = event.lang === 'ar';
    });
  }
}
