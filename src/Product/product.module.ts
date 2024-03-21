import { Module } from "@nestjs/common";
import { FileModule } from "src/File/file.module";
import { DatabaseModule } from "src/common/Database/database.module";
import { Product } from "./entities/product.entity";
import { ProductCategory } from "../ProductCategory/entities/product-category";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";


@Module({
    imports:[FileModule,DatabaseModule.forFeature([Product, ProductCategory])],
    providers:[ProductResolver, ProductService]
})
export class ProductModule{}