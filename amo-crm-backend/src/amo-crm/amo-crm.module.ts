import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AmoCrmService } from './amo-crm.service';
import { AmoCrmController } from './amo-crm.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [AmoCrmService],
  controllers: [AmoCrmController],
})
export class AmoCrmModule {}
