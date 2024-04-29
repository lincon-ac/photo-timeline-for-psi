import { isLowerCase } from "./lower-case.validator";

describe ('A função isLowerCase', () =>{
  it('Deve confirmar quando receber um texto em caixa baixa', () => {
      const valor = "mario";
      const result = isLowerCase(valor);
      expect(result).toBeTruthy();
  });

  it('Deve validar quando o valor enviado não for caixa baixa', () => {
    expect(isLowerCase('Mario')).toBeFalsy();
  });
});

