import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: any = {
    'Authorization': `Bearer ${this.token}`
  };

  constructor(private http : HttpClient) { console.log(this.header) }

  getAllReports() : Observable<Report[]> 
  {
    return this.http.get<Report[]>(this.url + "Reports/", { headers: this.header });
  };
  
  Add(newRep : Report) : Observable<Report> 
  {
    return this.http.post<Report>(this.url + "Reports/", newRep, { headers: this.header });
  }

  getById(id: number) : Observable<Report>
  {
    return this.http.get<Report>(this.url + "Reports/" + id, { headers: this.header });
  }

  Update(rep: Report) : Observable<Report>
  {
    return this.http.put<Report>(this.url + "Reports/" + rep.idReport, rep, { headers: this.header });
  }

  Delete(id: number) : Observable<Report>
  {
    return this.http.delete<Report>(this.url + "Reports/" + id, { headers: this.header });
  }
}
