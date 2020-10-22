import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Establishment } from 'src/app/interfaces/establishment';
import { EstablishmentsService } from 'src/app/services/establishments.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  establishment: Establishment;
  establishmentForm: FormGroup;

  mask: Subject<string> = new Subject();
  banks: Array<string> = [
    'Bradesco',
    'Santander',
    'ítau',
    'Next',
    'Nubank',
    'Inter',
    'C6 Bank',
  ];
  cities: Array<string> = [
    'Curitiba',
    'Salvador',
    'São Paulo',
    'Porto Alegre',
    'Rio de Janeiro',
    'Belo Horizonte',
  ];
  accountTypes: Array<string> = ['Conta Corrente', 'Poupança'];
  automaticWithdrawalOptions: Array<string> = ['Sim', 'Não'];
  submitted = false;
  constructor(
    private establishmentService: EstablishmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.establishmentService.getEstablishmentById(id).then((res) => {
          this.establishment = res;
          this.initializeForm();
        });
      }
    });
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  initializeForm(): void {
    this.establishmentForm = this.fb.group({
      name: [this.establishment.name, [Validators.required]],
      city: [this.establishment.city, [Validators.required]],
      address: [this.establishment.address, [Validators.required]],
      bank: [this.establishment.bank, [Validators.required]],
      accountType: [this.establishment.accountType, [Validators.required]],
      cpfOrcnpj: [this.establishment.cpfOrcnpj, [Validators.minLength(11)]],
      agency: [
        this.establishment.agency,
        [Validators.required, Validators.minLength(4)],
      ],
      agencyDigit: [this.establishment.agencyDigit, [Validators.required]],
      accountNumber: [
        this.establishment.accountNumber,
        [Validators.required, Validators.minLength(5)],
      ],
      accountNumberDigit: [
        this.establishment.accountNumberDigit,
        [Validators.required],
      ],
      automaticWithdrawal: [
        this.establishment.automaticWithdrawal,
        [Validators.required],
      ],
    });
  }

  hasError(formControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  handleErrorMessage(formControl): string | null {
    if (formControl.errors.required) {
      return 'Campo Obrigatório *';
    } else if (formControl.errors.minlength) {
      const requiredLength = formControl.errors.minlength.requiredLength;
      return `O campo deve ter no mínino ${requiredLength} caracteres *`;
    } else if (formControl.errors.maxlength) {
      const requiredLength = formControl.errors.maxlength.requiredLength;
      return `O campo deve ter no máximo ${requiredLength} caracteres  *`;
    }
  }

  get formControls() {
    return this.establishmentForm.controls;
  }

  updateAndFetchEstablishment(establishment: Establishment): void {
    this.establishmentService.saveEstablishment(establishment).then(() => {
      this.establishmentService
        .getEstablishmentById(this.establishment.id)
        .then((res) => {
          this.establishment = res;
        });
    });
  }

  saveEstablishment(): void {
    this.submitted = true;

    if (this.establishmentForm.invalid) {
      return;
    }

    const newEstablishmentValues = {
      ...this.establishment,
      ...this.establishmentForm.value,
    };

    this.updateAndFetchEstablishment(newEstablishmentValues);
  }
}
