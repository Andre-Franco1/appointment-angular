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

@Component({
  selector: 'app-create-appointment-page',
  standalone: true,
  imports: [FormCreateAppointmentComponent, CalendarComponent],
  templateUrl: './create-appointment-page.html',
  styleUrl: './create-appointment-page.css',
})
export class CreateAppointmentPageComponent implements OnInit{

  constructor(private areaService: AreaService, private appointmentTypeService: AppointmentTypeService, private clientService: ClientService, private professionalService: ProfessionalService){}

  areas: Area[] = [];
  professionalsByArea: Professional[] = [];
  appointmentTypes: AppointmentType[] = [];
  selectedProfessional: Professional = {} as Professional;

  //CalendarComponent
  calendarMonth: Date = new Date();
  availableDays: number[] = [];
  
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
  }

  onSelectedDate(date: Date){
    
  }

  onChangedMonth(date: Date){
    this.calendarMonth = date;
    this.loadAvailableDays();
  }

  loadAvailableDays(){
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarMonth).subscribe({
      next: days => this.availableDays = days
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
  }

  loadAppointmentTypes() {
    this.appointmentTypeService.getAppointmentTypes().subscribe({
      next: appointmentTypes => this.appointmentTypes = appointmentTypes
    })
  }

  createAppointment(){
    this.formCreateAppointmentComponent.submitted = true;
  }

}
