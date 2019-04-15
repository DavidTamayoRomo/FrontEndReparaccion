import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(translate: TranslateService) {
      translate.addLangs(['es','en', 'fr']);
      translate.setDefaultLang('es');
      translate.use('es');
      // const browserLang: string = translate.getBrowserLang();
      // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
   }
}
