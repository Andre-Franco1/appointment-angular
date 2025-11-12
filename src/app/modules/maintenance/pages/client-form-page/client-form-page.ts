import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/client';
import { ClientService } from '../../../../core/services/client';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './client-form-page.html',
  styleUrl: './client-form-page.css',
})
export class ClientFormPageComponent implements OnInit {

  clients: Client = {} as Client;

  clientForm: FormGroup;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private location: Location, private router: ActivatedRoute) {
    this.clientForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      let clientId = Number(params.get("id") ?? "0");
      if (clientId) {
        this.loadClient(clientId);
        this.isEditing = true;
      }
    })
  }
  loadClient(clientId: number) {
    this.clientService.getClientById(clientId).subscribe({
      next: client => this.clientForm.setValue(client),
      error: () => alert("Error ocurred during client load")
    })
  }

  save() {
    if (this.clientForm.valid) {
      if (this.isEditing) {
        this.clientService.update(this.clientForm.value).subscribe(
          {
            next: () => {
              this.location.back();
            },
            error: () => alert("Error during client save")
          }
        );
      }
      else {
        this.clientService.save(this.clientForm.value).subscribe(
          {
            next: () => {
              this.location.back();
            },
            error: () => alert("Error during client save")
          }
        )
      }

    }
  }

  cancel() {
    this.location.back();
  }

  get cfName() { return this.clientForm.get("name") }
  get cfPhone() { return this.clientForm.get("phone") }
  get cfDateOfBirth() { return this.clientForm.get("dateOfBirth") }

}
