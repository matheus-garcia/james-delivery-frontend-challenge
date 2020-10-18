import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/interfaces/establishment';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  establishment: Establishment;
  constructor() {}

  ngOnInit(): void {}
}
