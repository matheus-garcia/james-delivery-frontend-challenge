import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Establishment } from 'src/app/interfaces/establishment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() establishment: Establishment;
  @Output() select = new EventEmitter<Establishment>();

  constructor() {}

  ngOnInit(): void {}

  showEstablishmentInfo() {
    console.log('clicked', this.establishment);
    this.select.emit(this.establishment);
  }
}
