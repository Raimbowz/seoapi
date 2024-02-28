import { Injectable } from '@nestjs/common';
import {SeoPages} from "./entity/seo-pages.entity";
import {FunctionsService} from "../functions/functions.service";
import {CreateSeoPageDto} from "./dto/create-seo-page.dto";
import { InjectRepository } from '@nestjs/typeorm';
import {Entity, Repository} from "typeorm";

@Injectable()
export class SeoPagesService {
    constructor(@InjectRepository(SeoPages) private readonly seoPagesRepository: Repository<SeoPages>,
                private functions: FunctionsService,) {}

    async create(dto: CreateSeoPageDto) {

        let insertInfo = await this.seoPagesRepository.insert( {...dto});
      //  let res = await this.seoPagesRepository.create({...dto});
        console.log(insertInfo);
        return insertInfo
    }

    async getAllSeoPages(){
        return await this.seoPagesRepository.find();
    }
}
