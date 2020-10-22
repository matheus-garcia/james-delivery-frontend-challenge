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
          console.log('response', res);
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
      city: ['', [Validators.required]],
      address: [this.establishment.address, [Validators.required]],
      bank: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      cpfOrcnpj: ['', [Validators.minLength(11)]],
      agency: ['', [Validators.required, Validators.minLength(4)]],
      agencyDigit: ['', [Validators.required]],
      accountNumber: ['', [Validators.required, Validators.minLength(5)]],
      accountNumberDigit: ['', [Validators.required]],
      automaticWithdrawal: ['', [Validators.required]],
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
    } else if (formControl.controls.agency.errors) {
      return 'Campo Obrigatório *';
    }
  }

  get formControls() { return this.establishmentForm.controls; }

  saveEstablishment(): void {

    this.submitted = true;
    console.log(this.establishmentForm);

    if (this.establishmentForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      'SUCCESS!! :-)\n\n' +
        JSON.stringify(this.establishmentForm.value, null, 4)
    );
  }
}
