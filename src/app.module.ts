import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReadingProxyController } from './reading-proxy.controller';

@Module({
  imports: [HttpModule],
  controllers: [ReadingProxyController],
})
export class AppModule {}
