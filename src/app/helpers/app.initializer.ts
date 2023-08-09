import { LoginService } from "../services/loginService/login.service";

export function initializeApp(loginService: LoginService): Promise<any> {
    return new Promise((resolve, reject) => {
      // Do some asynchronous stuff
      loginService.refreshToken().subscribe();
    });
  }