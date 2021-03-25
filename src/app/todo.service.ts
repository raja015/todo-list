import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/todos';
const tagUrl = 'http://localhost:8000/api/tags';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
     return this.http.get<any[]>(baseUrl);

  }


  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {

    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}?title=${title}`);
  }

  getAllTags(): Observable<any> {
    return this.http.get<any[]>(tagUrl);
  }

  createTag(data: any): Observable<any> {
    // console.log(data);
    return this.http.post(tagUrl, data);
  }
}
