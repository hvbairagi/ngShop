import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  private _getOrder() {
    // this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
    //   if (params.id) {
    //     this.ordersService.getOrder(params.id).pipe(takeUntil(this.endSubs$)).subscribe((order) => {
    //       this.order = order;
    //       this.selectedStatus = order.status;
    //     });
    //   }
    // });

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

    this.order = orderObj;
  }

  onStatusChange(event) {
    this.ordersService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe({
        next: (order: Order) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Order ${order.id} is  created!`,
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
