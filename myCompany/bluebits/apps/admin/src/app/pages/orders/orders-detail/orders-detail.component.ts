import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder() {
    // this.route.params.subscribe((params) => {
    //   if (params.id) {
    //     this.ordersService
    //       .getOrder(params.id)
    //       .subscribe((order) => (this.order = order));
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
}
