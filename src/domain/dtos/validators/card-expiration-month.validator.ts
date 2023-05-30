import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CardExpirationMonthValidator', async: false })
export class CardExpirationMonthValidator implements ValidatorConstraintInterface {
  private message = '';
  validate(text: string) {
    if (!text) {
      this.message = 'mes es requerido.';
      return false;
    } else if (!this.validMonth(text)) {
      this.message = 'el mes es inválido.';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.message;
  }
  validMonth(value: string) {
    const month = parseInt(value);
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (months.includes(month)) {
      return true;
    }
    return false;
  }
}
