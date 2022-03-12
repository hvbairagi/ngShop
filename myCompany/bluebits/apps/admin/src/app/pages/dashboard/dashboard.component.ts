import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UserService } from '@bluebits/users';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getOrdersCount(),
    ])
      .pipe(takeUntil(this.endSubs$))
      .subscribe((values) => (this.statistics = values));
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
