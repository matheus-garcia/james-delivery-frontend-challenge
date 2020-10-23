import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Establishment } from '@interfaces/establishment';
import { EstablishmentsService } from '@services/establishments.service';
import { ConfirmSavingModalComponent } from '@components/confirm-saving-modal/confirm-saving-modal.component';

@Component({
  selector: 'card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  establishment: Establishment;
  establishmentForm: FormGroup;
  imageData: string | ArrayBuffer;

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
  constructor(
    private establishmentService: EstablishmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  openConfirmation(): void {
    if (this.establishmentForm.invalid) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmSavingModalComponent, {
      width: '25rem',
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.saveEstablishment(this.establishmentForm);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.establishmentService
          .getEstablishmentById(id)
          .then((res) => {
            if (res) {
              this.establishment = res;
            } else {
              this.goHome();
            }
          })
          .finally(() => {
            this.initializeForm();
          });
      } else {
        this.goHome();
      }
    });
  }

  goHome(): void {
    this.router.navigateByUrl('/home');
  }

  initializeForm(): void {
    this.establishmentForm = this.fb.group({
      name: [
        this.establishment.name || '',
        [Validators.required, Validators.maxLength(76)],
      ],
      city: [this.establishment.city || '', [Validators.required]],
      address: [
        this.establishment.address || '',
        [Validators.required, Validators.maxLength(76)],
      ],
      bank: [this.establishment.bank || '', [Validators.required]],
      accountType: [
        this.establishment.accountType || '',
        [Validators.required],
      ],
      cpfOrcnpj: [
        this.establishment.cpfOrcnpj || '',
        [Validators.minLength(11) || Validators.minLength(14)],
      ],
      agency: [
        this.establishment.agency || '',
        [Validators.required, Validators.minLength(4)],
      ],
      agencyDigit: [
        this.establishment.agencyDigit || '',
        [Validators.required],
      ],
      accountNumber: [
        this.establishment.accountNumber || '',
        [Validators.required, Validators.minLength(5)],
      ],
      accountNumberDigit: [
        this.establishment.accountNumberDigit || '',
        [Validators.required],
      ],
      automaticWithdrawal: [
        this.establishment.automaticWithdrawal || 'Não',
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
    } else if (formControl.errors.mask) {
      return `Deve colocar um CPF ou CNPJ no campo *`;
    }
  }

  get formControls() {
    return this.establishmentForm.controls;
  }

  updateAndFetchEstablishment(establishment: Establishment): void {
    this.establishmentService.saveEstablishment(establishment).then(() => {
      this.establishment = establishment;
    });
  }

  saveEstablishment(form: FormGroup): void {
    let newEstablishmentValues = {
      ...this.establishment,
      ...form.value,
    };

    if (this.imageData) {
      newEstablishmentValues = {
        ...newEstablishmentValues,
        picture: this.imageData,
      };
    }
    this.updateAndFetchEstablishment(newEstablishmentValues);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.imageData = event.target.result;
      };
    }
  }
}
