import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CardNumberValidator', async: false })
export class CardNumberValidator implements ValidatorConstraintInterface {
  private message = '';
  validate(text: string) {
    const regex = new RegExp('^[0-9]{13,16}$');
    if (!regex.test(text)) {
      this.message = 'cantidad de dígitos es inválido.';
      return false;
    } else if (!this.validAlgLuhn(text)) {
      this.message = 'el número de tarjeta es inválido.';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.message;
  }
  validAlgLuhn(value: string) {
    let checkSum = 0;
    let a = 1;

    for (let i = value.length - 1; i >= 0; i--) {
      let calc = 0;

      calc = Number(value.charAt(i)) * a;
      if (calc > 9) {
        checkSum = checkSum + 1;
        calc = calc - 10;
      }
      checkSum = checkSum + calc;

      if (a == 1) {
        a = 2;
      } else {
        a = 1;
      }
    }
    return checkSum % 10 == 0;
  }
}
