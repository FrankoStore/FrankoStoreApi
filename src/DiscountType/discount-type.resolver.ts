import { UseGuards } from "@nestjs/common";
import { Args, Resolver } from "@nestjs/graphql";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { RoleAuthorizationGuard } from "src/Auth/guards/role-authorization.guard";
import { RoleEnum } from "src/User/enums/role.enum";
import { DiscountTypeService } from "./discount-type.service";


@Resolver()
@UseGuards(AccessJwtAuthenticationGuard,RoleAuthorizationGuard)
export class DiscountTypeResolver{

    constructor(
        private readonly discountTypeService:DiscountTypeService
    ){}
    
    @Roles(RoleEnum.Admin, RoleEnum.Manager)
    async grantDiscountTypeForUser(@Args('userId') userId:number, @Args('discountTypeId') discountTypeId:number){
        return this.discountTypeService.grantDiscountTypeForUser(userId, discountTypeId);
    }
    
}