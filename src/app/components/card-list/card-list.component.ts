import { Component, OnInit } from '@angular/core';
import { Establishment } from '@interfaces/establishment';
import { EstablishmentsService } from 'src/app/services/establishments.service';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  
  establishments: Establishment[];
  
  constructor(private establishmentsService: EstablishmentsService) {
    this.establishmentsService.updateEstablishmentsList();
  }

  ngOnInit(): void {
    this.establishmentsService.bsEstablishments.subscribe((establishments) => {
      this.establishments = establishments;
    });
  }
}
