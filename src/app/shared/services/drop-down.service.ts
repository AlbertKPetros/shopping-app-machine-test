import { Injectable } from '@angular/core';
import { DropDown } from '../models/drop-down.model';

@Injectable({
  providedIn: 'root',
})
export class DropDownService {
  userType: DropDown[] = [
    { value: 'seller', text: 'Seller' },
    { value: 'buyer', text: 'Buyer' },
  ];

  businessSize: DropDown[] = [
    { value: 'largeBusiness', text: 'Large Business' },
    { value: 'mediumBusiness', text: 'Medium Business' },
    { value: 'smallBusiness', text: 'Small Business' },
  ];
  constructor() {}

  getUserType(): DropDown[] {
    return this.userType;
  }

  getBusinessSize(): DropDown[] {
    return this.businessSize;
  }
}
