import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/interfaces/establishment';
import { EstablishmentsService } from 'src/app/services/establishments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
