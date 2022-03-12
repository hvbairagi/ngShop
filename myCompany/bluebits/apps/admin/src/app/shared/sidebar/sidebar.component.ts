import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/users';
import { LocalStorageService } from 'libs/users/src/lib/services/local-storage.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.logout();
  }
}
