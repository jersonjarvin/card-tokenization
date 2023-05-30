import { CardNumberValidator } from '@/domain/dtos/validators';
const cardNumberValidator = new CardNumberValidator();

describe('Validación de tarjetas', () => {
  describe('Tarjeta no válida', () => {
    test('agregar una número de tarjeta incorrecto', () => {
      expect(cardNumberValidator.validAlgLuhn('3493 7003 8656 0692383')).toBe(false);
    });
  });
  describe('Tarjeta válida', () => {
    test('agregar una número de tarjeta correcto American Express', () => {
      expect(cardNumberValidator.validAlgLuhn('349370038656069')).toBe(true);
    });
  });
});
