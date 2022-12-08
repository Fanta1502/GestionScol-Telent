import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ENVIRONMENT } from './environments/environment';

if (ENVIRONMENT.production) {
  enableProdMode();
}
import 'zone.js'; //Added for lazy module error in firefox,safari in server.

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
