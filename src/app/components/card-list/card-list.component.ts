import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/interfaces/establishment';
import { EstablishmentsService } from 'src/app/services/establishments.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  establishments: Establishment[];
  constructor(private establishmentsService: EstablishmentsService) {}

  ngOnInit(): void {
    this.establishmentsService.getAll().subscribe((establishments) => {
      this.establishments = establishments;
    });
  }
}
