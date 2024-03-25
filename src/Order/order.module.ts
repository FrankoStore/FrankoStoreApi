import { Module } from "@nestjs/common";
import { OrderProduct } from "src/Order/entities/order-product.entity";
import { Order } from "src/Order/entities/order.entity";
import { OrderResolver } from "src/Order/order.resolver";
import { OrderService } from "src/Order/order.service";
import { DatabaseModule } from "src/common/Database/database.module";


@Module({
   imports: [DatabaseModule.forFeature([Order, OrderProduct])],
   providers: [OrderService, OrderResolver]
})
export class OrderModule { }