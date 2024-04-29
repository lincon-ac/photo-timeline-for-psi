import { AuthService } from "./auth.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { UserService } from "../user/user.service";

describe("O serviço AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  it("deve ser instanciado", () => {
    expect(service).toBeTruthy();
  });

  it("deve autenticar o usuario", fakeAsync(() => {
    const fakeBody = {
      id: 1,
      nome: "lincon",
      email: "lincon@lincon.com"
    };

    const spy = spyOn(userService, "setToken").and.returnValue(null);

    service.authenticate("lincon", "123").subscribe(response => {
      expect(response.body).toEqual(fakeBody);
      expect(spy).toHaveBeenCalledWith("tokenTest");
    });

    const request = httpMock.expectOne(req => {
      return req.method === "POST";
    });

    request.flush(fakeBody, {
      headers: { "x-access-token": "tokenTest" }
    });

    tick();
  }));
});
