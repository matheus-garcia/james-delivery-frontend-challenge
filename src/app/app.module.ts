import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { EstablishmentDetailsComponent } from './pages/establishment-details/establishment-details.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';

// Pages
import { HomeComponent } from './pages/home/home.component';

// Services
import { EstablishmentsService } from './services/establishments.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocalDbService } from './services/local-db.service';
import { AppConfigModule } from './appconfig.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    HomeComponent,
    CardListComponent,
    CardDetailsComponent,
    EstablishmentDetailsComponent,
    CustomInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    AppConfigModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [EstablishmentsService, LocalDbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
