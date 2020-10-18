import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

// Pages
import { HomeComponent } from './pages/home/home.component';

// Services
import { EstablishmentsService } from './services/establishments.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CardComponent, HomeComponent, CardListComponent, CardDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [EstablishmentsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
