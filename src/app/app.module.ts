//Core
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material Components
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

// App
import { AppComponent } from './app.component';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './appconfig.module';

// Components
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { EstablishmentDetailsComponent } from './pages/establishment-details/establishment-details.component';

// Services
import { EstablishmentsService } from './services/establishments.service';
import { LocalDbService } from './services/local-db.service';
import { ConfirmSavingModalComponent } from './components/confirm-saving-modal/confirm-saving-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    HomeComponent,
    CardListComponent,
    CardDetailsComponent,
    EstablishmentDetailsComponent,
    ConfirmSavingModalComponent,
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
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
