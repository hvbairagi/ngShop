import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';

const ORDER_STATUS = {
  0: {
    label: 'Pending',
    color: 'primary',
  },
  1: {
    label: 'Processed',
    color: 'warning',
  },
  2: {
    label: 'Shipped',
    color: 'warning',
  },
  3: {
    label: 'Delivered',
    color: 'success',
  },
  4: {
    label: 'Failed',
    color: 'danger',
  },
};

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
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
}
