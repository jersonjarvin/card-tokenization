import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CardExpirationYearValidator', async: false })
export class CardExpirationYearValidator implements ValidatorConstraintInterface {
  private message = '';
  validate(text: string) {
    if (!text) {
      this.message = 'año es requerido.';
      return false;
    } else if (!this.validYear(text)) {
      this.message = 'el año es inválido.';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.message;
  }
  validYear(value: string) {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 5;
    const year = parseInt(value);
    if (year >= currentYear && year <= maxYear) {
      return true;
    }
    return false;
  }
}
