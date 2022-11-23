import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../classes/course';
import { History } from '../classes/history';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'courses';
  selectedCourses: Course[] = [];

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('courses')
      .pipe(catchError(this.errorHandler));
  };

  addHistory(form: History): Observable<History> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(form);
    return this.http.post<History>('history', body, { headers: headers })
      .pipe(catchError(this.errorHandler));
  };

  getHistory(): Observable<History[]> {
    return this.http.get<History[]>('history')
      .pipe(catchError(this.errorHandler));
  };

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error('server error'));
  };
}
