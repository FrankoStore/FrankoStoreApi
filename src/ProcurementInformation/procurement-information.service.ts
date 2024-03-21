import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProcurementInformation } from "src/ProcurementInformation/entities/procurement-information.entity";
import { CreateProcurementInformationInput } from "src/ProcurementInformation/inputs/create-procurement-information.input";
import { UpdateProcurementInformationInput } from "src/ProcurementInformation/inputs/update-procurement-infomation.input";
import { Product } from "src/Product/entities/product.entity";
import { Supplier } from "src/Supplier/entities/supplier.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProcurementInformationService{
   constructor(
      @InjectRepository(ProcurementInformation)
      private readonly procurementInformationRepository: Repository<ProcurementInformation>,
      @InjectRepository(Product)
      private readonly productRepository:Repository<Product>,
      @InjectRepository(Supplier)
      private readonly supplierRepository:Repository<Supplier>
   ){}

   async makeProcurement(procurementInformation: CreateProcurementInformationInput){
      const newProcurementInformation = new ProcurementInformation({
         amount:procurementInformation.amount,
         description: procurementInformation.description,
         orderedDate: procurementInformation.orderedDate,
         product: await this.productRepository.findOneOrFail({where:{id: procurementInformation.productId}}),
         purchasePrice: procurementInformation.purchasePrice,
         supplier: await this.supplierRepository.findOneOrFail({where:{id: procurementInformation.supplierId}})
      })

      return this.procurementInformationRepository.save(newProcurementInformation);
   }

   async updateProcurement(procurementInformationId: number, procurementInformation: UpdateProcurementInformationInput){
      const newProcurementInformation = await this.procurementInformationRepository.findOne({where:{id:procurementInformationId}});

      if(!newProcurementInformation){
         throw new BadRequestException("No procurement information with such id!");
      }

      newProcurementInformation.amount = procurementInformation.amount || newProcurementInformation.amount;
      newProcurementInformation.deliveredDate = procurementInformation.deliveredDate || newProcurementInformation.deliveredDate;
      if(!newProcurementInformation.isDelivered && procurementInformation.isDelivered){
         
      }
   }
}