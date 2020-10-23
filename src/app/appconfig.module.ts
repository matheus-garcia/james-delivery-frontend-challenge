import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LocalDbService } from './services/local-db.service';

export function initApp(localDbService: LocalDbService) {
  return async () => await localDbService.startDatabase();
}

@NgModule({
  imports: [],
  providers: [
    LocalDbService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [LocalDbService],
      multi: true,
    },
  ],
})
export class AppConfigModule {}
