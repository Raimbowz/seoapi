import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import {FunctionsModule} from "../functions/functions.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
  imports:[
    FunctionsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ]
})
export class LeadsModule {}
