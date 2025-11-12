import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/client';
import { ClientService } from '../../../../core/services/client';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-clients-table-page',
  imports: [FormsModule, NgbModule, DatePipe, RouterLink],
  templateUrl: './clients-table-page.html',
  styleUrl: './clients-table-page.css',
})
export class ClientsTablePageComponent implements OnInit {

  constructor(private clientService: ClientService){}

  clientPage: Page<Client> = {} as Page<Client>;
  page = 1;

  nameFilter: string = "";

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

  pageChange(){
    this.loadClients();
  }

  filterName(){
    this.loadClients();
  }

  delete(client: Client){
    this.clientService.delete(client).subscribe({
      next: () => {
        this.loadClients();
      },
      error: () => {
        alert("Error during client removal");
      }
    });
  }
}
