export interface Order {
  id: number;
  orderCode: string;
  customerId: number;
  status: string;
  deliveryAddressId: number;
}