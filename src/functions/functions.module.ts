import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  providers: [FunctionsService],
  imports:[],
  exports: [
    FunctionsService
  ]
})
export class FunctionsModule {}
