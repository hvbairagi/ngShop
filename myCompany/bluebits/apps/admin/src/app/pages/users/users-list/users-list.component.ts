import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '@bluebits/users';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService
          .deleteUser(userId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe({
            next: () => {
              this._getUsers();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User is deleted!',
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User is not deleted!',
              });
            },
          });
      },
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  getCountryName(countryKey: string) {
    if (countryKey) return this.userService.getCountry(countryKey);
  }

  private _getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
