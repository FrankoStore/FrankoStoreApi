import { registerEnumType } from "@nestjs/graphql";

export enum OrderStatusEnum {
   Pending = "Pending",
   Cnaceled = "Canceled",
   Processed = "Processed",
   Success = "Success"
}

registerEnumType(OrderStatusEnum, {
   name: 'OrderStatusEnum',
});