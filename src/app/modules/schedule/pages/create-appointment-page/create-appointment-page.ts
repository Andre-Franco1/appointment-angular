import { Component, OnInit, ViewChild } from '@angular/core';
import { FormCreateAppointmentComponent } from '../../components/form-create-appointment/form-create-appointment';
import { AreaService } from '../../../../core/services/area';
import { Area } from '../../../../core/models/area';
import { Professional } from '../../../../core/models/professional';
import { AppointmentType } from '../../../../core/models/appointment-type';
import { AppointmentTypeService } from '../../../../core/services/appointment-type';
import { ClientService } from '../../../../core/services/client';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap } from 'rxjs';
import { Client } from '../../../../core/models/client';
import { CalendarComponent } from "../../components/calendar/calendar";
import { ProfessionalService } from '../../../../core/services/professional';
import { TimeComponent } from "../../components/time/time";
import { Time } from '../../components/time/models/time';
import { Appointment } from '../../../../core/models/appointment';
import { JsonPipe, DatePipe } from '@angular/common';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { ToastService } from '../../../../core/services/toast';
import { AppointmentService } from '../../../../core/services/appointment';

@Component({
  selector: 'app-create-appointment-page',
  standalone: true,
  imports: [FormCreateAppointmentComponent, CalendarComponent, TimeComponent, ModalComponent, DatePipe],
  templateUrl: './create-appointment-page.html',
  styleUrl: './create-appointment-page.css',
  providers: [JsonPipe]
})
export class CreateAppointmentPageComponent implements OnInit{

  constructor(private areaService: AreaService, private appointmentTypeService: AppointmentTypeService, private clientService: ClientService,
     private professionalService: ProfessionalService, private jsonPipe: JsonPipe, private toastService: ToastService, private appointmentService: AppointmentService){}

  areas: Area[] = [];
  professionalsByArea: Professional[] = [];
  appointmentTypes: AppointmentType[] = [];
  selectedProfessional: Professional = {} as Professional;
  appointment: Appointment = {} as Appointment;

  //CalendarComponent
  calendarMonth: Date = new Date();
  availableDays: number[] = [];
  selectedDate !: Date;
  calendarError: string = "";

  //TimeComponent
  availableTimes: Time[] = [];
  selectedTime !: Time;
  timeError: string = "";

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
    this.calendarError = "";
    this.loadAvailableTimes();
  }

  onSelectedTime(time: Time){
    this.selectedTime = time;
    this.timeError = "";
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
			switchMap(term => this.clientService.getClientsByName(term)),
      map( page => page.content || [])
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

  clean(){
    this.formCreateAppointmentComponent.cleanForm();
    this.availableTimes = [];
    this.availableDays = [];
    this.appointment = {} as Appointment;
  }

  createAppointment(modalConfirm: ModalComponent){
    this.formCreateAppointmentComponent.submitted = true;
    this.checkDateAndTimeErrors();

    if(this.isAppointmentValid()){
      this.appointment = this.createAppointmentObject();
      
      modalConfirm.open({size : "lg"}).then( confirm => {
        if (confirm) {
          this.appointmentService.save(this.appointment).subscribe({
            next: () => {
              this.toastService.show(`Appointment successfully created!`, 'bg-success text-light');
              this.clean();
            },
            error: (error) => {
              this.toastService.show(error.error.message, 'bg-danger text-light');
            }
          });
        }
      });
      
    }
  }

  private createAppointmentObject(): Appointment {
    let appointment: Appointment = {} as Appointment;
    appointment = {...this.formCreateAppointmentComponent.appointmentForm.value};
    appointment.startTime = this.selectedTime.startTime;
    appointment.endTime = this.selectedTime.endTime;
    appointment.date = this.selectedDate;
    return appointment;
  }

  private checkDateAndTimeErrors(): void {
    if (!this.selectedDate){
      this.calendarError = "*Select a date!";
    }

    if (!this.selectedTime){
      this.timeError = "*Select a time!";
    }
  }

  private isAppointmentValid(): boolean{
    return !!(this.formCreateAppointmentComponent.appointmentForm.valid && this.selectedDate && this.selectedTime);
  }
}
