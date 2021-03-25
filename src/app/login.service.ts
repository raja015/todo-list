import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    return this.http.get<any>(`${baseUrl}/${"me"}`);
  }

  post(data:any):Observable<any>{
    return this.http.post<any>(`${baseUrl}/${"login"}`,data);
  }
  signIncallBack(){
    return null;
  }

}
