import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class LeadDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    info: string;
}

