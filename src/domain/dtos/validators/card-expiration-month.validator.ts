import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CardExpirationMonthValidator', async: false })
export class CardExpirationMonthValidator implements ValidatorConstraintInterface {
    private message: string = "";
    validate(text: string, _args: ValidationArguments) {
        if (!text){
            this.message = "mes es requerido.";
            return false;
        }else if(!this.validMonth(text)) {
            this.message = "el mes es inválido.";
            return false;
        }
        return true;
    }

    defaultMessage(_args: ValidationArguments) {
        return this.message;
    }
    validMonth(value:string) {
        const month = parseInt(value);
        let months  = [1,2,3,4,5,6,7,8,9,10,11,12];
        if(months.includes(month)){
            return true;
        }
        return false;
    }
}