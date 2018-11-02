import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Document management system';
  private description = 'System for managment document';

  constructor(private router: Router) {

  }

  goToListDocument() {
    this.router.navigate(['list-document']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }

  goToMainPage() {
    this.router.navigate(['main']);
  }
}
