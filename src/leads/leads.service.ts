import { Injectable } from '@nestjs/common';
import {FunctionsService} from "../functions/functions.service";
import {HttpService} from "@nestjs/axios";
import {LeadDto} from "./dto/lead.dto";

@Injectable()
export class LeadsService {
    public headers;

    constructor(private functions: FunctionsService,
                private readonly httpService: HttpService) {
        this.headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    async sendLead(dto: LeadDto){
        const endpoint = process.env.CRM_ENDPOINT+'/'+process.env.CRM_TOKEN;
        const url = process.env.CRM_URL;

        const params = {
            httpService: this.httpService,
            endpoint: endpoint,
            url: url,
            headers: this.headers,
            options: dto
        };

        return await this.functions.postRequest(params);
    }
}
