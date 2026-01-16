import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Professional } from '../models/professional';
import { HttpClient } from '@angular/common/http';
import { Time } from '../../modules/schedule/components/time/models/time';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {

  baseUrl = environment.baseUrl + "/professionals";

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getProfessionalsPage(professionalNameFilter: string, page: number): Observable<Page<Professional>> {
    let url = `${this.baseUrl}?name_like=${professionalNameFilter}&page=${page}`;
    return this.http.get<Page<Professional>>(url);
  }

  delete(professional: Professional): Observable<void> {
    let url = `${this.baseUrl}/${professional.id}`;
    return this.http.delete<void>(url);
  }

  save(professional: Professional): Observable<void> {
    return this.http.post<void>(this.baseUrl, professional);
  }

  getProfessionalById(id: number): Observable<Professional> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Professional>(url);
  }

  update(professional: Professional): Observable<void> {
    let url = `${this.baseUrl}/${professional.id}`;
    return this.http.put<void>(url, professional);
  }

  getAvailableDays(professional: Professional, calendar: Date): Observable<number[]> {
    let month = calendar.getMonth() + 1;
    let year = calendar.getFullYear();
    let url = `${this.baseUrl}/${professional.id}/availability-days?year=${year}&month=${month}`;


    return this.http.get<number[]>(url);

  }

  getAvailableTimes(professional: Professional, selectedDate: Date): Observable<Time[]> {
    let date = selectedDate;
    let url = `${this.baseUrl}/${professional.id}/availability-times?date=${this.datePipe.transform(date, 'yyyy-MM-dd')}`;

    return this.http.get<Time[]>(url);

  }

}
