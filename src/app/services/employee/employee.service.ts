import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: any = {
    'Authorization': `Bearer ${this.token}`
  };

  constructor(private http : HttpClient) { console.log(this.header) }

  getAllEmployees() : Observable<Employee[]> 
  {
    return this.http.get<Employee[]>(this.url + "Employees/", { headers: this.header });
  };
  
  Add(newEmp : Employee) : Observable<Employee> 
  {
    return this.http.post<Employee>(this.url + "Employees/", newEmp);
  }

  getById(id: number) : Observable<Employee>
  {
    return this.http.get<Employee>(this.url + "Employees/" + id);
  }

  Update(emp: Employee) : Observable<Employee>
  {
    return this.http.put<Employee>(this.url + "Employees/" + emp.idEmployees, emp);
  }

  Delete(id: number) : Observable<Employee>
  {
    return this.http.delete<Employee>(this.url + "Employees/" + id);
  }
}
