import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentType } from '../models/appointment-type';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTypeService {
  baseUrl = environment.baseUrl + "/appointment-types";

  constructor(private http: HttpClient) { }

  getAppointmentTypes(): Observable<AppointmentType[]> {
    return this.http.get<AppointmentType[]>(this.baseUrl);
  }
}
