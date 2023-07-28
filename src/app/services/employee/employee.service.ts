import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements HttpInterceptor {
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

  getAllEmployees() : Observable<Employee[]> 
  {
    return this.http.get<Employee[]>(this.url + "Employees/", { headers: this.header });
  };
  
  Add(newEmp : Employee) : Observable<Employee> 
  {
    return this.http.post<Employee>(this.url + "Employees/", newEmp, { headers: this.header });
  }

  getById(id: string) : Observable<Employee>
  {
    return this.http.get<Employee>(this.url + "Employees/" + id, { headers: this.header });
  }

  Update(emp: Employee) : Observable<Employee>
  {
    return this.http.put<Employee>(this.url + "Employees/" + emp.employeeID, emp, { headers: this.header });
  }

  // Decentralize(id: number, role: String)
  // {
  //   return this.http.put(this.url + `Employees/Decentralize?id=${id}&role=${role}`, { headers: this.header });
  // }

  Delete(id: string) : Observable<Employee>
  {
    return this.http.delete<Employee>(this.url + "Employees/" + id, { headers: this.header });
  }
}
