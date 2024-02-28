import {HttpException, Injectable} from '@nestjs/common';
import { cryptico, RSAKey } from '@daotl/cryptico'
import {catchError, firstValueFrom, map} from "rxjs";
import Any = jasmine.Any;

import axios, {AxiosError, AxiosResponse} from "axios";

@Injectable()
export class FunctionsService {

    constructor() {}

    async transliterate(text) {
        text = text
            .replace(/\u0401/g, 'YO')
            .replace(/\u0419/g, 'I')
            .replace(/\u0426/g, 'TS')
            .replace(/\u0423/g, 'U')
            .replace(/\u041A/g, 'K')
            .replace(/\u0415/g, 'E')
            .replace(/\u041D/g, 'N')
            .replace(/\u0413/g, 'G')
            .replace(/\u0428/g, 'SH')
            .replace(/\u0429/g, 'SCH')
            .replace(/\u0417/g, 'Z')
            .replace(/\u0425/g, 'H')
            .replace(/\u042A/g, '')
            .replace(/\u0451/g, 'yo')
            .replace(/\u0439/g, 'i')
            .replace(/\u0446/g, 'ts')
            .replace(/\u0443/g, 'u')
            .replace(/\u043A/g, 'k')
            .replace(/\u0435/g, 'e')
            .replace(/\u043D/g, 'n')
            .replace(/\u0433/g, 'g')
            .replace(/\u0448/g, 'sh')
            .replace(/\u0449/g, 'sch')
            .replace(/\u0437/g, 'z')
            .replace(/\u0445/g, 'h')
            .replace(/\u044A/g, "'")
            .replace(/\u0424/g, 'F')
            .replace(/\u042B/g, 'I')
            .replace(/\u0412/g, 'V')
            .replace(/\u0410/g, 'a')
            .replace(/\u041F/g, 'P')
            .replace(/\u0420/g, 'R')
            .replace(/\u041E/g, 'O')
            .replace(/\u041B/g, 'L')
            .replace(/\u0414/g, 'D')
            .replace(/\u0416/g, 'ZH')
            .replace(/\u042D/g, 'E')
            .replace(/\u0444/g, 'f')
            .replace(/\u044B/g, 'i')
            .replace(/\u0432/g, 'v')
            .replace(/\u0430/g, 'a')
            .replace(/\u043F/g, 'p')
            .replace(/\u0440/g, 'r')
            .replace(/\u043E/g, 'o')
            .replace(/\u043B/g, 'l')
            .replace(/\u0434/g, 'd')
            .replace(/\u0436/g, 'zh')
            .replace(/\u044D/g, 'e')
            .replace(/\u042F/g, 'Ya')
            .replace(/\u0427/g, 'CH')
            .replace(/\u0421/g, 'S')
            .replace(/\u041C/g, 'M')
            .replace(/\u0418/g, 'I')
            .replace(/\u0422/g, 'T')
            .replace(/\u042C/g, "'")
            .replace(/\u0411/g, 'B')
            .replace(/\u042E/g, 'YU')
            .replace(/\u044F/g, 'ya')
            .replace(/\u0447/g, 'ch')
            .replace(/\u0441/g, 's')
            .replace(/\u043C/g, 'm')
            .replace(/\u0438/g, 'i')
            .replace(/\u0442/g, 't')
            .replace(/\u044C/g, "'")
            .replace(/\u0431/g, 'b')
            .replace(/\u044E/g, 'yu')
            .replace(' ','-')
            .replace(
                ['@','$',':',';','*',
                    '^','!','(',')','+','/',
                    '\\','~','|']
                ,'')
            .toLowerCase();
        return text;
    };

    async checkDto(dto:object){
        for (let key in dto) {
            if(!!dto[key]&&dto[key]===''){
                delete dto[key];
            }
        }

        return dto;
    }

    async saveDto(dto:object, obj:any){
        dto = await this.checkDto(dto);
        // Проверка данных на пустоту
        if(Object.keys(dto).length){
            await obj.set(dto);
            await obj.save();
        }else{
            return false;
        }

        return obj;
    }


    toRuDate(date){
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timezone: 'UTC'
        };
        // @ts-ignore
        return new Date(date).toLocaleString("ru", options)
    }

    ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    encryptPassword(dto){
        const chunks = this.chunk(dto.password, 3);

        dto.x = chunks[0];
        dto.zzz = chunks[1];
        dto.y = chunks[2];
        // https://www.npmjs.com/package/@daotl/cryptico
        const passPhrase = process.env.PRIVATE_KEY;
        const rsaKey = cryptico.generateRSAKey(passPhrase, 1024);
        const publicKeyString = cryptico.publicKeyString(rsaKey);

        const encrypt = cryptico.encrypt(dto.x, publicKeyString, rsaKey);
        const encrypt2 = cryptico.encrypt(dto.y, publicKeyString, rsaKey);
        const encrypt3 = cryptico.encrypt(dto.zzz, publicKeyString, rsaKey);

        if(encrypt.status==='success'){
            // @ts-ignore
            dto.x = encrypt.cipher;
        }

        if(encrypt2.status==='success'){
            // @ts-ignore
            dto.y = encrypt2.cipher;
        }

        if(encrypt3.status==='success'){
            // @ts-ignore
            dto.zzz = encrypt3.cipher;
        }

        return dto;
    }

    encryptString(str: string){
        const passPhrase = process.env.PRIVATE_KEY;
        const rsaKey = cryptico.generateRSAKey(passPhrase, 1024);
        const publicKeyString = cryptico.publicKeyString(rsaKey);

        const encrypt = cryptico.encrypt(str, publicKeyString, rsaKey);
        // @ts-ignore
        return encrypt.cipher;
    }

    decryptString(str: string){
        const passPhrase = process.env.PRIVATE_KEY;
        const rsaKey = cryptico.generateRSAKey(passPhrase, 1024);
        const res = cryptico.decrypt(str, rsaKey);
        // @ts-ignore
        return res.plaintext;
    }

    decryptPassword(dto, passPhrase){
        const rsaKey = cryptico.generateRSAKey(passPhrase, 1024);
        const x = cryptico.decrypt(dto.x, rsaKey);
        const y = cryptico.decrypt(dto.zzz, rsaKey);
        const zzz = cryptico.decrypt(dto.y, rsaKey);
        // @ts-ignore
        return x.plaintext+y.plaintext+zzz.plaintext
    }

    checkSortDto(dto){
        if(dto.sort==null){
            dto = {
                sort:'id',
                dest:'DESC'
            }
        }

        return dto;
    }

    chunk( str, len) {
        const padded = str.padEnd(Math.ceil(str.length / len) * len, '.');
        const res = [];
        for (let i = 0; i < padded.length / len; i++) {
             res.push(padded.substring(i * len, (i + 1) * len));
        }
        return res;
    }

    async sendActivation(email, emailUrl){
        const options = {
            "sender":{
                "name":"Expay.ru",
                "email":"info@expay.ru"
            },
            "to":[
                {
                    "email":email,
                }
            ],
            "subject":"Подтверждение почты Expay.ru",
            "htmlContent":`<html>
                    <head></head>
                    <body>
                        <p>Добрый день,</p>
                        <br>
                        <p>Ссылка для подтверждения аккаунта https://expay.ru/email/confirm/${emailUrl}</p>
                    </body>
                </html>`
        };

        const headers:object = {
            headers : {
                'content-type': 'application/json',
                'api-key': process.env.SEND_IN_BLUE_API_KEY,
                'accept':'application/json',
            }
        }

        let data;
        data = await axios.post(`https://api.sendinblue.com/v3/smtp/email`,options, headers).then((data) => {
            return data.data;
        }).catch(data => {
            return data;
        });

        return data;
    }

    async postRequest({httpService, endpoint, url, headers, options}):Promise<any>{

        if(options.accessToken){
            headers.headers.Authorization = options.accessToken;
        }

        const fullUrl = `${url}${endpoint}`

        if(options.refreshToken){
            console.log(options);
        }

        const [data] = await Promise.all([firstValueFrom(
            httpService.post(fullUrl,
                options, headers).pipe(
                // @ts-ignore
                map(response => response.data),
                catchError((error: AxiosError) => {
                    return error.message;
                }),
            ),
        )]);

        return data;
    }

    async getRequest({httpService,endpoint, url}):Promise<AxiosResponse>{
        const fullUrl = `${url}${endpoint}`
        const data:any = await firstValueFrom(
            httpService.get(fullUrl).pipe(
                catchError((error: AxiosError) => {
                    return error.message;
                }),
            ),
        );

        return data;
    }

}
