import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class ModalComponent {
  
  @Input()
  title !: string;

  @ViewChild("modal")
  private modalContent !: TemplateRef<ModalComponent>;

  private modalService = inject(NgbModal);

  open(params: any = {}) {
		return this.modalService.open(this.modalContent, params).result; 
	}

  
}
