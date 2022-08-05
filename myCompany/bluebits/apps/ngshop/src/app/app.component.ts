import { Component, OnInit } from '@angular/core';
import { UserService } from '@bluebits/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ngshop';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.initAppSession();
  }
}
