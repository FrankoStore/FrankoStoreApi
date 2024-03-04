import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateFileInput } from "src/File/inputs/create-file.input";


@InputType()
export class CreateProductInput{
    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    name:string;

    @Field(() => [String])
    categories: String;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Number)
    retailPrice:number;

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    description:string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true})
    @Type(() => CreateFileInput)
    @Field(() => [CreateFileInput])
    images:CreateFileInput[];
}