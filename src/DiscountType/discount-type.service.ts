import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscountType } from "./entities/discount-type";
import { Repository } from "typeorm";
import { User } from "src/User/entities/user.entity";


@Injectable()
export class DiscountTypeService{
    constructor(
        @InjectRepository(DiscountType) 
        private readonly discountTypeRepository:Repository<DiscountType>,
        @InjectRepository(User) 
        private readonly userReposiotry:Repository<User>,
    ){}

    async grantDiscountTypeForUser(userId:number, discountTypeId:number){
        const user = await this.userReposiotry.findOne({where:{id:userId}});
        if(!user) throw new BadRequestException("Not valid or not existing user id!");

        const discountType = await this.discountTypeRepository.findOne({where:{id:discountTypeId}});
        if(!discountType) throw new BadRequestException("Not valid or not existing discount type id!");

        user.dicountType = discountType;
        return this.userReposiotry.save(user);
    }
}