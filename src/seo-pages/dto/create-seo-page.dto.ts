import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateSeoPageDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    url_1?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    url_1_type?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    url_2?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    url_2_type?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    url_3?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    url_3_type?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    url_4?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    url_4_type?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly description?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly h1?: string;

}

