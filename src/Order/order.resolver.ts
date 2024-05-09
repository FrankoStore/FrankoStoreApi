import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Order } from "src/Order/entities/order.entity";
import { FindOptionsOrderInput } from "src/Order/inputs/find-options-order.input";
import { OrderService } from "src/Order/order.service";


@Resolver()
export class OrderResolver {
   constructor(
      private readonly orderService: OrderService
   ) { }

   @Query(() => [Order])
   async getOrders(@Args('findOptions', { nullable: true }) findOptions: FindOptionsOrderInput) {
      return await this.orderService.getAllOrders(findOptions);
   }

   // @Mutation(() => Order)
   // async createOrder() 
}