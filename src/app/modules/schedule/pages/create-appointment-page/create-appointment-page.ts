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

@Component({
  selector: 'app-create-appointment-page',
  standalone: true,
  imports: [FormCreateAppointmentComponent],
  templateUrl: './create-appointment-page.html',
  styleUrl: './create-appointment-page.css',
})
export class CreateAppointmentPageComponent implements OnInit{

  constructor(private areaService: AreaService, private appointmentTypeService: AppointmentTypeService, private clientService: ClientService){}

  areas: Area[] = [];
  professionalsByArea: Professional[] = [];
  appointmentTypes: AppointmentType[] = [];
  
  @ViewChild(FormCreateAppointmentComponent)
  private formCreateAppointmentComponent !: FormCreateAppointmentComponent;

  ngOnInit(): void {
    this.loadAreas();
    this.loadAppointmentTypes();
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
