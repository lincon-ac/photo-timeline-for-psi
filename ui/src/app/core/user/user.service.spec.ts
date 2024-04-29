import { TestBed } from "@angular/core/testing";
import { TokenService } from "../token/token.service";
import { UserService } from "./user.service";

describe('O serviço UserService', ()=>{
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('Deve ser instanciado', ()=>{
    expect(service).toBeTruthy();
  });

  it('Deve através de um token, configurar as informações do usuário', ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5NDU2MzYwMCwiZXhwIjoxNTk0NjUwMDAwfQ.vfMH1ecldWd2JM1yRbpCNlgLnp6T9nthTfr6jc27tcw';
    service.setToken(token);
    expect(service.isLogged()).toBeTruthy();
    expect(service.getUserName()).toBe("flavio");
    service.getUser().subscribe(user => {
      expect(user.name).toBe("flavio");
    });
  });

  it('Deve limpar as informações no logout', ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5NDU2MzYwMCwiZXhwIjoxNTk0NjUwMDAwfQ.vfMH1ecldWd2JM1yRbpCNlgLnp6T9nthTfr6jc27tcw';
    service.setToken(token);
    service.logout();
    expect(service.isLogged()).toBeFalsy();
    expect(service.getUserName()).toBeFalsy();
  });
});
