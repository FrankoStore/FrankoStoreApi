import { Order } from "src/Order/entities/order.entity";
import { Product } from "src/Product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "OrderProduct" })
export class OrderProduct {

   @ManyToOne(() => Product)
   @JoinColumn({ name: "Product" })
   product: Product;

   @ManyToOne(() => Order)
   @JoinColumn({ name: "Order" })
   order: Order;

   @Column('int', { name: "Quantity" })
   quantity: number;

   @Column('double precision', { name: "Price" })
   price: number;
}