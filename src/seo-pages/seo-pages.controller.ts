import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateSeoPageDto} from "./dto/create-seo-page.dto";
import {SeoPagesService} from "./seo-pages.service";

@ApiTags('Сео страницы')
@Controller('seo-pages')
export class SeoPagesController {

    constructor(
        private seoPagesService: SeoPagesService) {
    }

    @ApiOperation({summary: 'Все валюты'})
    @Get()
    getAllSeoPages() {
        return this.seoPagesService.getAllSeoPages()
    }

    @ApiOperation({summary: 'Создать новую страницу'})
    @Post()
    createSeoPages(@Body() dto: CreateSeoPageDto) {
        return this.seoPagesService.create(dto)
    }
}
