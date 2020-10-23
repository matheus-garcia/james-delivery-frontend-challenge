import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Establishment } from 'src/app/interfaces/establishment';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() establishment: Establishment;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showEstablishmentInfo() {
    this.router.navigate(['/establishment', this.establishment.id]);
  }
}
