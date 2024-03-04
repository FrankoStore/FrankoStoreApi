import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity, JoinTable, ManyToMany} from "typeorm";
import { ProductCategory } from "./product-category";
import { File } from "src/File/entities/file.entity";


@ObjectType()
@Entity({name: "Product"})
export class Product extends EntityBase<Product>{

    @Field(() => String)
    @Column('varchar',{name: "Name", unique:true, length:255})
    name:string;

    @Field(() => [ProductCategory])
    @ManyToMany(() => ProductCategory, {nullable:false})
    @JoinTable({name: "PruductCategory"})
    categories: ProductCategory[];

    @Field(() => Number)
    @Column('double precision', {name:"RetailPrice"})
    retailPrice:number;

    @Field(() => String)
    @Column('text', {name:"Description"})
    description:string;

    @Field(() => Number)
    @Column('integer', {name: "Amount", default: 0})
    amount:number;

    @Field(() => [File])
    @ManyToMany(() => File)
    @JoinTable({name:"ProductImage"})
    images:File[];
}