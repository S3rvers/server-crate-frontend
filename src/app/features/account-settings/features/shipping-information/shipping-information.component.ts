import { Component, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { saveChanges } from '../../../../core/utils/settings';

@Component({
  selector: 'app-shipping-information',
  standalone: true,
  imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule],
  templateUrl: './shipping-information.component.html',
  styleUrl: './shipping-information.component.scss'
})
export class ShippingInformationComponent implements OnInit {
  shippingForm!: FormGroup

  ngOnInit(): void {
    this.shippingForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
    })
  }

  saveShippingDetails() {
    if (this.shippingForm.invalid) return ;
    saveChanges(this.shippingForm)
  }
  
}
