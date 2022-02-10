import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  navMode: MatDrawerMode = 'side';
  title = 'Heroes';
  opened = false;

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.navMode = 'over';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.navMode = 'over';
      this.opened = false;
    }
    if (event.target.innerWidth > 768) {
      this.navMode = 'side';
      this.opened = true;
    }
  }
}
