import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Student {
  private apiUrl = 'https://localhost:7164/api/Students';

  constructor(private http: HttpClient) { }

  
  register(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, student);
  }

 
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers: { 'Content-Type': 'application/json' } });
  }

  
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

 
  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }
}
