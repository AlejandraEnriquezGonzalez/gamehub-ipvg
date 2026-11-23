
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TorneosController } from './torneos.controller.js';
import { TorneosService } from './torneos.service.js';
import { Torneo } from './entities/torneo.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Torneo])],
  controllers: [TorneosController],
  providers: [TorneosService],
    exports: [TypeOrmModule, TorneosService],
})
export class TorneosModule {}
