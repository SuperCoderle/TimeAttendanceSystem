import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UseServiceService implements HttpInterceptor {
  //Constructor
  constructor(
    private http: HttpClient
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(request);
  }

  //Declare Variables
  url: string = environment.api_url;

  //Methods
  public getData(route: string): Observable<any> {
    return this.http.get(this.url + route);
  }

  public postData(route: string, body: any): Observable<any> {
    return this.http.post(this.url + route, body);
  }

  public putData(route: string, body: any): Observable<any> {
    return this.http.put(this.url + route, body);
  }

  public deleteData(route: string): Observable<any> {
    return this.http.delete(this.url + route);
  }
}
