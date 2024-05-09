import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProduct } from "src/Order/entities/order-product.entity";
import { Order } from "src/Order/entities/order.entity";
import { FindOptionsOrderInput } from "src/Order/inputs/find-options-order.input";
import { Between, FindOptionsWhere, In, Repository } from "typeorm";

@Injectable()
export class OrderService {
   constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
      @InjectRepository(OrderProduct)
      private readonly orderProductRepository: Repository<OrderProduct>
   ) { }

   async getAllOrders(findOptions?: FindOptionsOrderInput) {
      const where: FindOptionsWhere<Order> = {};

      if (findOptions?.ids) {
         where.id = In(findOptions.ids);
      }

      if (findOptions?.customerIds) {
         where.customer = { id: In(findOptions?.customerIds) };
      }

      if (findOptions?.executorIds) {
         where.executor = { id: In(findOptions?.executorIds) };
      }

      if (findOptions?.statuses) {
         where.status = In(findOptions.statuses);
      }

      if (findOptions?.summaryPayment) {
         where.summaryPayment = Between(findOptions.summaryPayment.min, findOptions.summaryPayment.max);
      }

      if (findOptions?.updatedAt) {
         where.updatedAt = Between(findOptions.updatedAt.start, findOptions.updatedAt.end);
      }

      if (findOptions?.createdAt) {
         where.createdAt = Between(findOptions.createdAt.start, findOptions.createdAt.end);
      }

      return this.orderRepository.find({ where: where, skip: findOptions?.skip, take: findOptions?.take, relations: { customer: true, executor: true } })

   }


   // async createOrder() {

   // }
}