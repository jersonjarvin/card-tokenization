import {EmailValidator} from '@/domain/dtos/validators'
const emailValidator = new EmailValidator();

describe("Email Validación", ()=>{
    describe("Dominio no valido", ()=> {
        test('Agregar un dominio incorrecto', ()=> {
            expect(emailValidator.validDomains("example@yahoo.com")).toBe(false);
        })
    })
})