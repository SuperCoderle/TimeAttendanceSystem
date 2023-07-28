import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  url: string = environment.api_url;
  token: string | null = window.localStorage.getItem("token");
  header: any = {
    'Authorization': `Bearer ${this.token}`
  };

  constructor(private http: HttpClient) { console.log(this.header) }

  getAllSchedules(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.url + "Attendances/", { headers: this.header });
  };

  Add(newAttend: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.url + "Attendances/", newAttend, { headers: this.header });
  }

  getById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(this.url + "Attendances/" + id, { headers: this.header });
  }

  Update(attend: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(this.url + "Attendances/" + attend.idAttendance, attend, { headers: this.header });
  }

  Delete(id: number): Observable<Attendance> {
    return this.http.delete<Attendance>(this.url + "Attendances/" + id, { headers: this.header });
  }
}
