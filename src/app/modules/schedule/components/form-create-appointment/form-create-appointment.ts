import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Area } from '../../../../core/models/area';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Professional } from '../../../../core/models/professional';
import { AppointmentType } from '../../../../core/models/appointment-type';
import { OperatorFunction } from 'rxjs';
import { Client } from '../../../../core/models/client';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-create-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, NgbModule],
  templateUrl: './form-create-appointment.html',
  styleUrl: './form-create-appointment.css',
})
export class FormCreateAppointmentComponent {

  @Input()
  areas: Area[] = [];

  @Input()
  professionals: Professional[] = [];

  @Input()
  appointmentTypes: AppointmentType[] = [];

  @Input()
  searchClients !: OperatorFunction<string, readonly Client[]>;

  @Output()
  selectedAreaEvent = new EventEmitter<Area>();

  @Output()
  selectedProfessionalEvent = new EventEmitter<Professional>();

  submitted: boolean = false;

  appointmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.appointmentForm = this.formBuilder.group({
      area: ['', Validators.required],
      professional: [{value: '', disabled: true}, Validators.required],
      appointmentType: ['', Validators.required],
      client: ['', Validators.required],
      comments: ['']
    });
  }

  // Used by typeahed component
  formatter = (client: Client) => client.name;

  onAreaChanged(){
    this.selectedAreaEvent.emit(this.appointmentForm.value["area"]);
    this.appointmentForm.controls["professional"].enable();
  }

  onProfessionalChanged(){
    this.selectedProfessionalEvent.emit(this.appointmentForm.value["professional"]);
  }

  getSelectedClient(): Client{
    return this.appointmentForm.controls["client"].value;
  }

  get afArea(){
    return this.appointmentForm.get('area');
  }

  get afProfessional(){
    return this.appointmentForm.get('professional');
  }

  get afAppointmentType(){
    return this.appointmentForm.get('appointmentType');
  }

  get afClient(){
    return this.appointmentForm.get('client');
  }

}
