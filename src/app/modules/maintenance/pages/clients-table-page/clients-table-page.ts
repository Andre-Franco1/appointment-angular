import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/client';
import { ClientService } from '../../../../core/services/client';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastService } from '../../../../core/services/toast';
import { ModalComponent } from '../../../../shared/components/modal/modal';


@Component({
  selector: 'app-clients-table-page',
  standalone: true,
  imports: [FormsModule, NgbModule, DatePipe, RouterLink, ModalComponent],
  templateUrl: './clients-table-page.html',
  styleUrl: './clients-table-page.css',
})
export class ClientsTablePageComponent implements OnInit {

  constructor(private clientService: ClientService, private toastService: ToastService) { }

  clientPage: Page<Client> = {} as Page<Client>;
  page = 1;

  nameFilter: string = "";

  selectedClient !: Client;

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients(this.nameFilter, this.page).subscribe({
      next: response => {
        this.clientPage.content = response.body;
        this.clientPage.numberOfElements = parseInt(response.headers.get("X-Total-Count") || "0");
      }
    });
  }

  pageChange() {
    this.loadClients();
  }

  filterName() {
    this.loadClients();
  }

  delete(client: Client, modalConfirm: ModalComponent) {
    this.selectedClient = client;
    modalConfirm.open().then( confirm => {
      if (confirm) {
        this.clientService.delete(client).subscribe({
          next: () => {
            this.toastService.show(`${client.name} successfully deleted!`, 'bg-success text-light');
            this.loadClients();
          },
          error: () => {
            this.toastService.show('There was an error while deleting', 'bg-danger text-light');
          }
        });
      }
    })

  }
}
