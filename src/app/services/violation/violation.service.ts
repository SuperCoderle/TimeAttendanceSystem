import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Violation } from 'src/app/models/dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViolationService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: HttpHeaders = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', `Bearer ${this.token}`);

  constructor(private http : HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req);
  }

  getAllViolations() : Observable<Violation[]> 
  {
    return this.http.get<Violation[]>(this.url + "Violations/", { headers: this.header });
  };
  
  Add(newVio : Violation) : Observable<Violation> 
  {
    return this.http.post<Violation>(this.url + "Violations/", newVio, { headers: this.header });
  }

  getById(id: number) : Observable<Violation>
  {
    return this.http.get<Violation>(this.url + "Violations/" + id, { headers: this.header });
  }

  Update(vio: Violation) : Observable<Violation>
  {
    return this.http.put<Violation>(this.url + "Violations/" + vio.violationID, vio, { headers: this.header });
  }

  Delete(id: number) : Observable<Violation>
  {
    return this.http.delete<Violation>(this.url + "Violations/" + id, { headers: this.header });
  }
}
