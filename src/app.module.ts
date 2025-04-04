import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NetworkService } from './network/network.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot({ isGlobal: true })],
  providers: [NetworkService, WhatsappService],
})
export class AppModule {}
