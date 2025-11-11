import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  getRealName(): string {
    return "User Name";
  }

  isAdmin(): boolean{
    return true;
  }

  logout(){
    console.log("logout");
  }
}
