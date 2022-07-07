import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { Cart } from '../../models/cart.model';
import { OrderItem } from '../../models/order-item.model';
import { Order } from '../../models/order.model';
import { ORDER_STATUS } from '../../order.constants';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '61a9a1be70ebaf18d4f2b57e';

  countries = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return { product: item.productId, quantity: item.quantity };
    });
  }

  private _getCountries() {
    this.countries = this.userService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        // redirect to thank you page // payment
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order has been placed successfully!',
        });
        this.router.navigate(['/success']);
        this.cartService.emptyCart();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The order could not be placed. Please try again!',
        });
      },
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
