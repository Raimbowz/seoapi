import { Module } from '@nestjs/common';

import {SeoPages} from "./seo-pages/entity/seo-pages.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {FunctionsModule} from "./functions/functions.module";
import * as path from "path";
import {SeoPagesModule} from "./seo-pages/seo-pages.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port:  Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        SeoPages
      ],
      synchronize: true,
    }),
    SeoPagesModule,
    FunctionsModule
  ],

})
export class AppModule {}
