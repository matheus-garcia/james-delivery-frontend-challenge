import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentDetailsComponent } from './establishment-details.component';

describe('EstablishmentDetailsComponent', () => {
  let component: EstablishmentDetailsComponent;
  let fixture: ComponentFixture<EstablishmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
