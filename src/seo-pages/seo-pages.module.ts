import { Module } from '@nestjs/common';
import { SeoPagesController } from './seo-pages.controller';
import { SeoPagesService } from './seo-pages.service';
import {SeoPages} from "./entity/seo-pages.entity";
import {FunctionsModule} from "../functions/functions.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [SeoPagesController],
  providers: [SeoPagesService],
  imports: [
    TypeOrmModule.forFeature([SeoPages]),
    FunctionsModule
  ],

})
export class SeoPagesModule {}
