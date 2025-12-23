import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Professional } from '../models/professional';
import { HttpClient } from '@angular/common/http';
import { Time } from '../../modules/schedule/components/time/models/time';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  
  baseUrl = environment.baseUrl + "/professionals";

  constructor(private http: HttpClient, private datePipe: DatePipe){}

  getAvailableDays(professional: Professional, calendar: Date): Observable<number[]>{
    let month = calendar.getMonth() + 1;
    let year = calendar.getFullYear();
    let url = `${this.baseUrl}/${professional.id}/availability-days?year=${year}&month=${month}`;

    
    return this.http.get<number[]>(url);

  }

  getAvailableTimes(professional: Professional, selectedDate: Date): Observable<Time[]>{
    let date = selectedDate;
    let url = `${this.baseUrl}/${professional.id}/availability-times?date=${this.datePipe.transform(date, 'yyyy-MM-dd')}`;

    return this.http.get<Time[]>(url);

  }

}
