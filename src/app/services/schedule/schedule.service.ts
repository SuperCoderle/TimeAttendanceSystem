import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: any = {
    'Authorization': `Bearer ${this.token}`
  };

  constructor(private http: HttpClient) { console.log(this.header) }

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url + "Schedules/", { headers: this.header });
  };

  Add(newSche: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.url + "Schedules/", newSche, { headers: this.header });
  }

  getById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.url + "Schedules/" + id, { headers: this.header });
  }

  Update(sche: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.url + "Schedules/" + sche.scheduleID, sche, { headers: this.header });
  }

  Delete(id: number): Observable<Schedule> {
    return this.http.delete<Schedule>(this.url + "Schedules/" + id, { headers: this.header });
  }
}
