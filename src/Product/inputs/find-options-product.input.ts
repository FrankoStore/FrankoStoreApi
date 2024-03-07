import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, Min, IsEnum,} from "class-validator";
import { SizeEnum } from "../enums/size.enum";
import { FindOptionsProductCategoryInput } from "./find-options-product-category.input";


@InputType()
export class FindOptionsProductInput{
    @Field(() => Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    @Min(0)
    id?: number;

    @Field(() => String, {nullable:true})
    @IsOptional()
    @IsString()
    name?:string;

    @Field(() => Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    @Min(0)
    retailPrice?:number;

    @Field(() => String, {nullable:true})
    @IsOptional()
    @IsString()
    description?:string;

    @Field(() => Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    @Min(0)
    height?:number;

    @Field(() => Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    @Min(0)
    width?:number;

    @Field(() => Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    @Min(0)
    length?:number;

    @Field(() => SizeEnum, {nullable:true})
    @IsOptional()
    @IsEnum(SizeEnum)
    size?:SizeEnum;

    @Field(() => Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    @Min(0)
    amount?:number;

    @Field(() => FindOptionsProductCategoryInput, {nullable:true})
    @Type(() => FindOptionsProductCategoryInput)
    @IsOptional()
    categories?:FindOptionsProductCategoryInput;
}