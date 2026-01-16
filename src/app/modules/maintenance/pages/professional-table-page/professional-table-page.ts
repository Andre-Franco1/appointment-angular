import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { Professional } from '../../../../core/models/professional';
import { ProfessionalService } from '../../../../core/services/professional';
import { ToastService } from '../../../../core/services/toast';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { ActivePipe } from '../../../../shared/pipes/active-pipe';
import { Area } from '../../../../core/models/area';

@Component({
  selector: 'app-professional-table-page',
  imports: [FormsModule, NgbModule, RouterLink, ModalComponent, ActivePipe],
  templateUrl: './professional-table-page.html',
  styleUrl: './professional-table-page.css',
})
export class ProfessionalTablePageComponent implements OnInit {

  constructor(private professionalService: ProfessionalService, private toastService: ToastService) { }

  professionalPage: Page<Professional> = {} as Page<Professional>;
  page = 0;

  nameFilter: string = "";

  selectedProfessional !: Professional;

  ngOnInit(): void {
    this.loadProfessionals();
  }

  loadProfessionals() {
    const backendPage = Math.max(this.page - 1, 0);

    this.professionalService.getProfessionalsPage(this.nameFilter, backendPage).subscribe({
      next: response => {
        this.professionalPage = response;
      }
    });
  }

  pageChange() {
    this.loadProfessionals();
  }

  filterName() {
    this.loadProfessionals();
  }

  delete(professional: Professional, modalConfirm: ModalComponent) {
    this.selectedProfessional = professional;
    modalConfirm.open().then(confirm => {
      if (confirm) {
        this.professionalService.delete(professional).subscribe({
          next: () => {
            this.toastService.show(`${professional.name} successfully deleted!`, 'bg-success text-light');
            this.loadProfessionals();
          },
          error: () => {
            this.toastService.show('There was an error while deleting', 'bg-danger text-light');
          }
        });
      }
    })

  }

  getAreaNames(areas: Area[]): string {
  return areas?.map(a => a.name).join(', ') ?? '';
}

}
