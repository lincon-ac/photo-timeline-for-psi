import { TokenService } from "./token.service";

describe('O serviço TokenService', () =>{
  let token;
  let service;
  it('Deve ser instanciado', () => {
      const service = new TokenService()
      expect(service).toBeTruthy();
  });

  it('Deve guardar um Token', () => {
    service.setToken(token);
    expect(service.hasToken()).toBeTruthy();  //smoke test
    expect(service.getToken()).toBe("testetoken");
  });



  it('Deve remover um token', () => {
    service.setToken(token);
    service.removeToken();
    expect(service.hasToken()).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  });

  beforeEach(() => {
    token = 'testetoken';
    service = new TokenService();
  })

  afterEach(() => localStorage.clear());
});

