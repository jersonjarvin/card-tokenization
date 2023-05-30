import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CardExpirationYearValidator', async: false })
export class CardExpirationYearValidator implements ValidatorConstraintInterface {
    private message: string = "";
    validate(text: string, _args: ValidationArguments) {
        if (!text){
            this.message = "año es requerido.";
            return false;
        }else if(!this.validYear(text)) {
            this.message = "el año es inválido.";
            return false;
        }
        return true;
    }

    defaultMessage(_args: ValidationArguments) {
        return this.message;
    }
    validYear(value:string) {
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear + 5;
        const year = parseInt(value);
        if(year >= currentYear && year <= maxYear){
            return true;
        }
        return false;
    }
}