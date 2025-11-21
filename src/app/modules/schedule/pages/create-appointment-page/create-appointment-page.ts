import { Component, OnInit, ViewChild } from '@angular/core';
import { FormCreateAppointmentComponent } from '../../components/form-create-appointment/form-create-appointment';
import { AreaService } from '../../../../core/services/area';
import { Area } from '../../../../core/models/area';
import { Professional } from '../../../../core/models/professional';
import { AppointmentType } from '../../../../core/models/appointment-type';
import { AppointmentTypeService } from '../../../../core/services/appointment-type';
import { ClientService } from '../../../../core/services/client';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Client } from '../../../../core/models/client';
import { CalendarComponent } from "../../components/calendar/calendar";
import { ProfessionalService } from '../../../../core/services/professional';
import { TimeComponent } from "../../components/time/time";
import { Time } from '../../components/time/models/time';
import { Appointment } from '../../../../core/models/appointment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-appointment-page',
  standalone: true,
  imports: [FormCreateAppointmentComponent, CalendarComponent, TimeComponent],
  templateUrl: './create-appointment-page.html',
  styleUrl: './create-appointment-page.css',
  providers: [JsonPipe]
})
export class CreateAppointmentPageComponent implements OnInit{

  constructor(private areaService: AreaService, private appointmentTypeService: AppointmentTypeService, private clientService: ClientService, private professionalService: ProfessionalService, private jsonPipe: JsonPipe){}

  areas: Area[] = [];
  professionalsByArea: Professional[] = [];
  appointmentTypes: AppointmentType[] = [];
  selectedProfessional: Professional = {} as Professional;

  //CalendarComponent
  calendarMonth: Date = new Date();
  availableDays: number[] = [];
  selectedDate !: Date;

  //TimeComponent
  availableTimes: Time[] = [];
  selectedTime !: Time;

  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent !: FormCreateAppointmentComponent;

  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentTypes();
  }

  onSelectedProfessional(professional: Professional){
    this.selectedProfessional = professional;
    this.calendarMonth = new Date();
    this.loadAvailableDays();
    this.availableTimes = [];
  }

  onSelectedDate(date: Date){
    this.selectedDate = date;
    this.loadAvailableTimes();
  }

  onSelectedTime(time: Time){
    this.selectedTime = time;
  }

  onChangedMonth(date: Date){
    this.calendarMonth = date;
    this.availableTimes = [];
    this.loadAvailableDays();
  }

  loadAvailableDays(){
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarMonth).subscribe({
      next: days => this.availableDays = days
    })
  }

  loadAvailableTimes(){
    this.professionalService.getAvailableTimes(this.selectedProfessional, this.selectedDate).subscribe({
      next: times => this.availableTimes = times
    })
  }

  searchClients = (text: Observable<string>):Observable<Client[]> => {
    return text.pipe(
			debounceTime(200),
			distinctUntilChanged(),
      filter(term => term.length >= 2),
			switchMap(term => this.clientService.getClientsByName(term))
		);
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas = areas
    })
  }

  onSelectedArea(area: Area){
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea = professionals;
      }
    })
    this.availableDays = [];
    this.availableTimes = [];
  }

  loadAppointmentTypes() {
    this.appointmentTypeService.getAppointmentTypes().subscribe({
      next: appointmentTypes => this.appointmentTypes = appointmentTypes
    })
  }

  createAppointment(){
    this.formCreateAppointmentComponent.submitted = true;
    let appointment: Appointment = {} as Appointment;
    
    appointment = {...this.formCreateAppointmentComponent.appointmentForm.value};
    appointment.startTime = this.selectedTime.startTime;
    appointment.endTime = this.selectedTime.endTime;
    appointment.date = this.selectedDate;

    alert(this.jsonPipe.transform(appointment));
  }

}
