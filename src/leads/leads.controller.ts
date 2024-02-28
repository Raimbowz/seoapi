import {Body, Controller, Get, Post} from '@nestjs/common';
import {LeadsService} from "./leads.service";
import {ApiOperation} from "@nestjs/swagger";
import {LeadDto} from "./dto/lead.dto";


@Controller('leads')
export class LeadsController {
    constructor(
        private leadsService: LeadsService
    ) {}

    @ApiOperation({summary: 'Послать lead'})
    @Post()
    async sendLead(@Body() dto:LeadDto){
        return await this.leadsService.sendLead(dto);
    }
}
