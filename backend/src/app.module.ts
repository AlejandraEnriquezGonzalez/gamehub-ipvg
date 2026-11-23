import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { EquiposModule } from './equipos/equipos.module.js';
import { TorneosModule } from './torneos/torneos.module.js';
import { InscripcionesModule } from './inscripciones/inscripciones.module.js';
import { PartidosModule } from './partidos/partidos.module.js';
import { ResultadosModule } from './resultados/resultados.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UsuariosModule,

    EquiposModule,

    TorneosModule,

    InscripcionesModule,

    PartidosModule,

    ResultadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
