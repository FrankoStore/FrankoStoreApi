import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity } from "typeorm";

@Entity({name:"Supplier"})
@ObjectType()
export class Supllier extends EntityBase<Supllier>{

    @Field(() => String)
    @Column('varchar', {name:"CompanyName", length:255, unique:true})
    companyName:string;

    @Field(() => String)
    @Column('varchar', {name:"PhoneNumber", length:50, unique:true})
    phoneNumber:string;

    @Field(() => String)
    @Column('varchar', {name:"Address", length:"MAX"})
    address:string;

    @Field(() => String)
    @Column('varchar', {name:"Webasite", length:"MAX", nullable:true})
    website:string;

    @Field(() => String)
    @Column('varchar', {name:"Email", length:255})
    email:string;
}