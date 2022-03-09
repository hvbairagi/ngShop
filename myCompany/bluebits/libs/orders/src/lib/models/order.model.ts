import { OrderItem } from './order-item.model';
import { User } from '@bluebits/users';

export class Order {
  id?: string;
  orderItem?: OrderItem;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}