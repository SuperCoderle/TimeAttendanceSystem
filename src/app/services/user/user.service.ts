import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.api_url;

  constructor(private http : HttpClient) { }

  Verify(Email: string, Password: string) : Observable<Token> {
    return this.http.get<Token>(this.url + `Employees/Verify?Email=${Email}&Password=${Password}`);
  }
}
