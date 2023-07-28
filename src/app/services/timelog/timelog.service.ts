import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog } from 'src/app/models/timelog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimelogService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: any = {
    'Authorization': `Bearer ${this.token}`
  };

  constructor(private http: HttpClient) { console.log(this.header) }

  getAllTimeLog(): Observable<TimeLog[]> {
    return this.http.get<TimeLog[]>(this.url + "TimeLogs/", { headers: this.header });
  };

  Add(newTime: TimeLog): Observable<TimeLog> {
    return this.http.post<TimeLog>(this.url + "TimeLogs/", newTime, { headers: this.header });
  }

  getById(id: number): Observable<TimeLog> {
    return this.http.get<TimeLog>(this.url + "TimeLogs/" + id, { headers: this.header });
  }

  Update(Time: TimeLog): Observable<TimeLog> {
    return this.http.put<TimeLog>(this.url + "TimeLogs/" + Time.idTimeLogs, Time, { headers: this.header });
  }

  Delete(id: number): Observable<TimeLog> {
    return this.http.delete<TimeLog>(this.url + "TimeLogs/" + id, { headers: this.header });
  }
}
