import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { ConfigurationModule } from './common/Configuration/configuration.module';
import { GQLModule } from './common/GQL/gql.module';
import { DatabaseModule } from './common/Database/database.module';
import { InitModule } from './Init/init.module';

@Module({
  imports: [ConfigurationModule, GQLModule, DatabaseModule, InitModule, AuthModule, UserModule],
})
export class AppModule {}
