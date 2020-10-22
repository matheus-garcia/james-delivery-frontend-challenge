import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmSavingModalComponent } from './confirm-saving-modal.component';

describe('ConfirmSavingModalComponent', () => {
  let component: ConfirmSavingModalComponent;
  let fixture: ComponentFixture<ConfirmSavingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSavingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSavingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
