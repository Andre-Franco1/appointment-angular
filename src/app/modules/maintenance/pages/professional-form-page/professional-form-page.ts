import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professional } from '../../../../core/models/professional';
import { ProfessionalService } from '../../../../core/services/professional';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../core/services/toast';
import { Location } from '@angular/common';
import { AreaService } from '../../../../core/services/area';
import { Area } from '../../../../core/models/area';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-professional-form-page',
  imports: [FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './professional-form-page.html',
  styleUrl: './professional-form-page.css',
})
export class ProfessionalFormPageComponent implements OnInit {

  professionals: Professional = {} as Professional;

  areas: Area[] = [];

  professionalForm: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private professionalService: ProfessionalService, private location: Location, private router: ActivatedRoute, private toastService: ToastService, private areaService: AreaService) {
    this.professionalForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      active: [null, Validators.required],
      areas: [[], Validators.required]

    })
  }

  ngOnInit(): void {
    this.loadAreas();
    this.router.paramMap.subscribe(params => {
      let professionalId = Number(params.get("id") ?? "0");
      if (professionalId) {
        this.loadProfessional(professionalId);
        this.isEditing = true;
      }
    })
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: response => {
        this.areas = response;
      }
    });
  }

  loadProfessional(professionalId: number) {
    this.professionalService.getProfessionalById(professionalId).subscribe({
      next: professional => this.professionalForm.setValue(professional),
      error: () => alert("Error ocurred during professional load")
    })
  }
  @ViewChild('clientSavedToast', { static: true }) clientSavedToast!: TemplateRef<any>;

  save() {
    if (this.professionalForm.valid) {
      if (this.isEditing) {
        this.professionalService.update(this.professionalForm.value).subscribe(
          {
            next: () => {
              this.toastService.show('Professional updated successfully!', 'bg-success text-light');
              this.location.back();
            },
            error: () => this.toastService.show('There was an error while saving!', 'bg-danger text-light')
          }
        );
      }
      else {
        this.professionalService.save(this.professionalForm.value).subscribe(
          {
            next: () => {
              this.toastService.show('Professional saved successfully!', 'bg-success text-light');
              this.location.back();
            },
            error: () => this.toastService.show('There was an error while saving!', 'bg-danger text-light')
          }
        );
      }

    }
  }

  cancel() {
    this.location.back();
  }

  get pfName() { return this.professionalForm.get("name") }
  get pfPhone() { return this.professionalForm.get("phone") }
  get pfActive() { return this.professionalForm.get("active") }
  get pfAreas() { return this.professionalForm.get('areas') }

}
