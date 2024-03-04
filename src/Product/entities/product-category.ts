import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity } from "typeorm";


@ObjectType()
@Entity({name: "ProductCategory"})
export class ProductCategory extends EntityBase<ProductCategory>{
    @Column('varchar',{name:"Name", unique:true, length:255})
    @Field(() => String)
    name:string;
}