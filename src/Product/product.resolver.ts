import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProductInput } from "./inputs/create-product.input";
import { ProductService } from "./product.service";
import { UpdateProductInput } from "./inputs/update-product.input";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { UseGuards } from "@nestjs/common";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { Product } from "./entities/product.entity";
import { FindOptionsProductInput } from "./inputs/find-options-product.input";
import { Public } from "src/Auth/decorators/public.decorator";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { RoleEnum } from "src/User/enums/role.enum";


@Resolver()
@UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard)
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    @Query(() => [Product])
    @Public()
    async getProducts(@Args('findOptions', { nullable: true }) findOptions: FindOptionsProductInput) {
        return await this.productService.getProducts(findOptions);
    }

    @Mutation(() => Product)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async createProduct(@Args('product') product: CreateProductInput) {
        return this.productService.createProduct(product);
    }

    @Mutation(() => Product)
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async updateProduct(@Args('id') id: number, @Args('product') product: UpdateProductInput) {
        return this.productService.updateProduct(id, product);
    }
}