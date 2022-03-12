import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((orders) => {
        this.orders = orders;
        const orderObj = {
          id: '01',
          orderItem: {
            product: 'Trimmer',
            quantity: 5,
          },

          shippingAddress1: 'NB-01, Sushila Nagar, Mangrol',
          shippingAddress2: 'NB-01, Nimbahera, Chittorgarh',
          city: 'Nimbahera',
          zip: '312620',
          country: 'India',
          phone: '9079318547',
          status: 0,
          totalPrice: '123',
          user: {
            id: '10010',
            name: 'Harsh Vardhan Bairagi',
            password: '123456',
            email: 'hvbairagi@gmail.com',
            phone: '9079318547',
            token: '123-132-132-123',
            isAdmin: true,
            street: 'Sushila Nagar',
            apartment: 'NB-01',
            zip: '312620',
            city: 'Nimbahera',
            country: 'India',
          },
          dateOrdered: String(new Date()),
        };
        this.orders.push(orderObj);
      });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService
          .deleteOrder(orderId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe({
            next: () => {
              this._getOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is deleted!',
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Order is not deleted!',
              });
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
