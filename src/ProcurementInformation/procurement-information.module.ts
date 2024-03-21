import { Module } from "@nestjs/common";
import { ProcurementInformationResolver } from "src/ProcurementInformation/procurement-information.resolver";
import { ProcurementInformationService } from "src/ProcurementInformation/procurement-information.service";
import { DatabaseModule } from "src/common/Database/database.module";

@Module({
   imports:[DatabaseModule.forFeature([ProcessingInstruction])],
   providers:[ProcurementInformationService, ProcurementInformationResolver]
})
export class ProcurementInformationModule{}