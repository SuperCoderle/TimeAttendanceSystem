import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payroll } from 'src/app/models/dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: HttpHeaders = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req);
  }

  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(this.url + "Payrolls/", { headers: this.header });
  };

  Add(newPay: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(this.url + "Payrolls/", newPay, { headers: this.header });
  }

  getById(id: number): Observable<Payroll> {
    return this.http.get<Payroll>(this.url + "Payrolls/" + id, { headers: this.header });
  }

  Update(pay: Payroll): Observable<Payroll> {
    return this.http.put<Payroll>(this.url + "Payrolls/" + pay.payRollID, pay, { headers: this.header });
  }

  Delete(id: number): Observable<Payroll> {
    return this.http.delete<Payroll>(this.url + "Payrolls/" + id, { headers: this.header });
  }
}
