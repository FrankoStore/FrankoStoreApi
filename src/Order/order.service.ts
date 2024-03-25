import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProduct } from "src/Order/entities/order-product.entity";
import { Order } from "src/Order/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
   constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
      @InjectRepository(OrderProduct)
      private readonly orderProductRepository: Repository<OrderProduct>
   ) { }

   async createOrder() {

   }
}