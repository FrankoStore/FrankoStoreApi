import { Field } from "@nestjs/graphql";
import { OrderStatusEnum } from "src/Order/enums/order-status.enum";
import { User } from "src/User/entities/user.entity";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity({ name: "Order" })
export class Order extends EntityBase<Order> {

   @Field(() => User)
   @ManyToOne(() => User)
   @JoinColumn({ name: "Customer" })
   customer: User;

   @Field(() => OrderStatusEnum)
   @Column('enum', { name: "Status", enum: OrderStatusEnum })
   status: OrderStatusEnum;

   @Field(() => User)
   @ManyToOne(() => User, { nullable: true })
   @JoinColumn({ name: "ExecutorId" })
   executor: User;

   @Field(() => Number)
   @Column('int', { name: "SummaryPayment" })
   summaryPayment: number;

   @CreateDateColumn({ name: "CreatedAt" })
   createdAt: Date;

   @UpdateDateColumn({ name: "UpdatedAt" })
   updatedAt: Date;
}